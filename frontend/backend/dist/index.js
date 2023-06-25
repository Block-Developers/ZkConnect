"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const reclaim_sdk_1 = require("@reclaimprotocol/reclaim-sdk");
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const callbackUrl = process.env.CALLBACK_URL + '/' + 'callback/';
const linksCollectionName = 'submitted_links';
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const dbName = "ZkConnect";
let linksCollection;
const client = new mongodb_1.MongoClient("mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/ZkConnect");
const getLinksCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!linksCollection) {
        yield client.connect();
        const db = client.db(dbName);
        linksCollection = db.collection(linksCollectionName);
    }
    return linksCollection;
});
const reclaim = new reclaim_sdk_1.reclaimprotocol.Reclaim();
const isValidRepo = (repoStr) => {
    return repoStr.indexOf('/') > -1 && repoStr.split('/').length === 2;
};
app.get('/home/repo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { repo } = req.query;
    if (!repo) {
        res.status(400).send(`400 - Bad Request: repo is required`);
        return;
    }
    const repoFullName = repo;
    if (!isValidRepo(repoFullName)) {
        res.status(400).send(`400 - Bad Request: invalid repository name`);
        return;
    }
    const callbackId = 'repo-' + reclaim_sdk_1.reclaimprotocol.utils.generateUuid();
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
    });
    const template = reclaim.requestProofs({
        title: 'ZKCOnnect',
        baseCallbackUrl: callbackUrl,
        callbackId: callbackId,
        requestedProofs: [
            requestProof
        ]
    });
    const templateId = template.id;
    const url = template.reclaimUrl;
    try {
        const linksCollection = yield getLinksCollection();
        yield linksCollection.insertOne({
            callback_id: callbackId,
            status: 'pending',
            repo: repoFullName,
            template_id: templateId,
        });
    }
    catch (e) {
        res.status(400).send(`500 - Internal Server Error - ${e}`);
        return;
    }
    res.json({ url, callbackId });
}));
app.get('/status/:callbackId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let status;
    if (!req.params.callbackId) {
        res.status(400).send(`400 - Bad Request: callbackId is required`);
        return;
    }
    const callbackId = req.params.callbackId;
    try {
        const linksCollection = yield getLinksCollection();
        const result = yield linksCollection.findOne({ callback_id: callbackId });
        if (!result) {
            res.status(404).send(`404 - Not Found: callbackId not found`);
            return;
        }
        status = result.status;
    }
    catch (e) {
        res.status(500).send(`500 - Internal Server Error - ${e}`);
        return;
    }
    res.json({ status });
}));
app.use(express_1.default.text({ type: '*/*' }));
app.post('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id) {
        res.status(400).send(`400 - Bad Request: callbackId is required`);
        return;
    }
    if (!req.body) {
        res.status(400).send(`400 - Bad Request: body is required`);
        return;
    }
    const proofs = reclaim_sdk_1.reclaimprotocol.utils.getProofsFromRequestBody(req.body);
    if (!proofs || !proofs.length) {
        res.status(400).send(`400 - Bad Request: claims are required`);
        return;
    }
    const callbackId = req.query.id;
    const claims = { claims: proofs };
    try {
        const linksCollection = yield getLinksCollection();
        const submittedLink = yield linksCollection.findOne({ callback_id: callbackId });
        if (!submittedLink) {
            res.status(404).send(`404 - Not Found: callbackId not found`);
            return;
        }
        if (!submittedLink) {
            res.status(404).send(`404 - Not Found: callbackId not found`);
            return;
        }
        const result = yield linksCollection.updateOne({ callback_id: callbackId }, { $set: { claims: claims, status: 'verified' } });
        console.log(result);
    }
    catch (e) {
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
}));
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const linksCollection = yield getLinksCollection();
    const data = yield linksCollection.find().toArray();
    res.json(data);
}));
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
