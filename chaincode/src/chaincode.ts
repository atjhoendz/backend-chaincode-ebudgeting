import { Context, Contract } from "fabric-contract-api";
import { v1 as uuidv1 } from "uuid";
import { queryString, wrapResult } from "./assetHelper";

export class Chaincode extends Contract {
  public async create(ctx: Context, data: string): Promise<string> {
    await ctx.stub.putState(uuidv1(), Buffer.from(data));

    return "Data berhasil ditambahkan";
  }

  public async getByType(ctx: Context, type: string): Promise<string> {
    const qs = queryString({ docType: type });

    const results = await ctx.stub.getQueryResult(JSON.stringify(qs));

    const wrappedResults = await wrapResult(results);

    return wrappedResults;
  }

  public async getByKey(ctx: Context, key: string): Promise<string> {
    const resultAsByte = await ctx.stub.getState(key);

    if (!resultAsByte.toString()) return "Data tidak tersedia";

    let resultAsJSON = {};

    try {
      resultAsJSON = JSON.parse(resultAsByte.toString());
    } catch (err) {
      return `Error: ${err.message}`;
    }

    return JSON.stringify(resultAsJSON);
  }

  public async updateByKey(
    ctx: Context,
    key: string,
    data: string
  ): Promise<string> {
    if (!(await this.isDataExist(ctx, key))) return "Data tidak tersedia";

    await ctx.stub.putState(key, Buffer.from(data));

    return "Data berhasil diperbarui";
  }

  public async deleteByKey(ctx: Context, key: string): Promise<string> {
    if (!(await this.isDataExist(ctx, key))) return "Data tidak tersedia";

    await ctx.stub.deleteState(key);

    return "Data berhasil dihapus";
  }

  public async isDataExist(ctx: Context, key: string): Promise<boolean> {
    const resultAsByte = await ctx.stub.getState(key);

    if (!resultAsByte.toString()) return false;

    return true;
  }

  // TODO
  /*
   * Get By Query
   *
   */
}
