import { Context, Contract } from "fabric-contract-api";
import { v1 as uuidv1 } from "uuid";
import { queryString, wrapResult } from "./assetHelper";

export class Chaincode extends Contract {
  public async initLedger(ctx: Context) {
    const user = {
      docType: "user",
      username: "admin",
      nama_lengkap: "Administrator",
      password: "$2b$10$rLLQTp0CJu1VSe.iGG3t8.PHgGOPg4sysHumCl96TlrDNGo7hR5P2",
      nip: "123456789098765432",
      jabatan: "Admin",
    };

    await this.create(ctx, JSON.stringify(user));
  }

  public async create(ctx: Context, data: string): Promise<boolean> {
    await ctx.stub.putState(uuidv1(), Buffer.from(data));

    return true;
  }

  public async getByType(ctx: Context, type: string): Promise<Array<any>> {
    const qs = queryString({ docType: type });

    const results = await ctx.stub.getQueryResult(JSON.stringify(qs));

    const wrappedResults = await wrapResult(results);

    return wrappedResults;
  }

  public async getByKey(ctx: Context, key: string): Promise<Object> {
    const resultAsByte = await ctx.stub.getState(key);

    if (!resultAsByte.toString()) return {};

    let resultAsJSON = {};

    try {
      resultAsJSON = JSON.parse(resultAsByte.toString());
    } catch (err) {
      return { error: err.message };
    }

    return resultAsJSON;
  }

  public async getByQuery(ctx: Context, query: string): Promise<Array<any>> {
    const qs = queryString(JSON.parse(query));

    const results = await ctx.stub.getQueryResult(JSON.stringify(qs));

    const wrappedResults = await wrapResult(results);

    return wrappedResults;
  }

  public async updateByKey(
    ctx: Context,
    key: string,
    data: string
  ): Promise<boolean> {
    if (!(await this.isDataExist(ctx, key))) return false;

    await ctx.stub.putState(key, Buffer.from(data));

    return true;
  }

  public async deleteByKey(ctx: Context, key: string): Promise<boolean> {
    if (!(await this.isDataExist(ctx, key))) return false;

    await ctx.stub.deleteState(key);

    return true;
  }

  public async isDataExist(ctx: Context, key: string): Promise<boolean> {
    const resultAsByte = await ctx.stub.getState(key);

    if (!resultAsByte.toString()) return false;

    return true;
  }
}
