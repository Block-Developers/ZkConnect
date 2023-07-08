import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import cors from 'cors'
import { MongoClient } from 'mongodb';

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000
const callbackUrl = process.env.CALLBACK_URL! + '/' + 'callback/'
const linksCollectionName = 'submitted_links';
app.use(express.json())
app.use(cors())

const dbName = "ZkConnect";
let linksCollection: any;
const client = new MongoClient("mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/ZkConnect");
const getLinksCollection = async (): Promise<any> => {
	if (!linksCollection) {
	  await client.connect();
	  const db = client.db(dbName);
	  linksCollection = db.collection(linksCollectionName);
	}
	return linksCollection;
};

const reclaim = new reclaimprotocol.Reclaim()

const isValidRepo = (repoStr: string) => {
	return repoStr.indexOf('/') > -1 && repoStr.split('/').length === 2
}

app.get('/home/repo', async (req: Request, res: Response) => {
	const { repo } = req.query
	if (!repo) {
		res.status(400).send(`400 - Bad Request: repo is required`)
		return
	}
	const repoFullName = repo as string

	if (!isValidRepo(repoFullName)) {
		res.status(400).send(`400 - Bad Request: invalid repository name`)
		return
	}

	const callbackId = 'repo-' + reclaimprotocol.utils.generateUuid()
	// const template = (
	// 	await reclaim.requestProofs()
	// const url = template.url
	const requestProof = new reclaim.CustomProvider({
		provider: 'github-commits',
		payload: {
			repository: repoFullName,
			type: 'github-commits',
			searchQuery: {
				keywords: [],
				qualifiers: {}
			}
		}
	})

	const template = reclaim.requestProofs({
		title: 'ZKCOnnect',
		baseCallbackUrl: callbackUrl,
		callbackId: callbackId,
		requestedProofs: [
			requestProof
		]

	})
	const templateId = template.id
	const url = template.reclaimUrl

	try {
		const linksCollection = await getLinksCollection();
		await linksCollection.insertOne({
			callback_id: callbackId,
			status: 'pending',
			repo: repoFullName,
			template_id: templateId,
		})
	} catch (e) {
		res.status(400).send(`500 - Internal Server Error - ${e}`)
		return
	}

	res.json({ url, callbackId })
})

app.get('/status/:callbackId', async (req: Request, res: Response) => {
	let status

	if (!req.params.callbackId) {
		res.status(400).send(`400 - Bad Request: callbackId is required`)
		return
	}

	const callbackId = req.params.callbackId

	try {
		const linksCollection = await getLinksCollection();
		const result = await linksCollection.findOne({ callback_id: callbackId });
		if (!result) {
			res.status(404).send(`404 - Not Found: callbackId not found`)
			return
		}
		status = result.status
	} catch (e) {
		res.status(500).send(`500 - Internal Server Error - ${e}`)
		return
	}

	res.json({ status })
})

app.use(express.text({ type: '*/*' }))

app.post('/callback', async (req: Request, res: Response) => {
	if (!req.query.id) {
		res.status(400).send(`400 - Bad Request: callbackId is required`);
		return;
	}

	if (!req.body) {
		res.status(400).send(`400 - Bad Request: body is required`);
		return;
	}


	const proofs = reclaimprotocol.utils.getProofsFromRequestBody(req.body)

	if (!proofs || !proofs.length) {
		res.status(400).send(`400 - Bad Request: claims are required`);
		return;
	}

	const callbackId = req.query.id;

	const claims = { claims: proofs };

	try {
		const linksCollection = await getLinksCollection();
		const submittedLink = await linksCollection.findOne({ callback_id: callbackId });
		if (!submittedLink) {
			res.status(404).send(`404 - Not Found: callbackId not found`);
			return;
		}
		if (!submittedLink) {
			res.status(404).send(`404 - Not Found: callbackId not found`);
			return;
		}

		const result = await linksCollection.updateOne(
			{ callback_id: callbackId },
			{ $set: { claims: claims, status: 'verified' } }
		);
		console.log(result)

	} catch (e) {
		res.status(500).send(`500 - Internal Server Error - ${e}`);
		return;
	}

	res.send(`<div
		style="
		width: 100%;
		height: 100%;
		display: flex;
		font-size: 16px;
		color: white;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #c561fb;
		"
	>
		<h1>
		Your'e identity is Claiamed!.
		</h1>
	</div>`);
});

app.get('/data', async (req, res) => {
	const linksCollection = await getLinksCollection();
	const data = await linksCollection.find().toArray();
	res.json(data);
});

process.on('uncaughtException', function (err) {
	console.log('Caught exception: ', err)
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
});
