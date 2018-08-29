import { IRequestHandler } from "vso-node-api/interfaces/common/VsoBaseInterfaces";
import { TestPlan, TestPoint, TestCaseResult, TestRun } from "vso-node-api/interfaces/TestInterfaces";
import { RunCreateModel, RunUpdateModel } from "vso-node-api/interfaces/TestInterfaces";
import { WebApi, getHandlerFromToken, getBasicHandler } from "vso-node-api/WebApi";
import { TestApi } from "vso-node-api/TestApi";

const DATA_TEST = {
    enpoitUrl: "http://localhost:8080/tfs/DefaultCollection",
    usr: "test",
    pwd: "admin",
    project: "Sample"
}

async function main(){
    const credHandler = getBasicHandler(DATA_TEST.usr, DATA_TEST.pwd);
    const webApi: WebApi = new WebApi(DATA_TEST.enpoitUrl, credHandler);
    const connectionData = await webApi.connect();
    console.log("Connected to WebApi: " + connectionData.instanceId);
    const testApi: TestApi = await webApi.getTestApi();
    console.log("Passed get TestApi");
    const plans: TestPlan[] = await testApi.getPlans(DATA_TEST.project);
    plans.forEach((plan) => {
        console.log(`Found test plan ${plan.name}`);
    });
}

main();