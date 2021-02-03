import { Context, Contract } from "fabric-contract-api";
import { Provinsi as provinsiModel } from "../../models/admin/provinsi";
import { v1 as uuidv1 } from "uuid";
import { queryString, wrapResult } from "../../helper/assetHelper";

export class Provinsi extends Contract {
  public async create(ctx: Context, nama: string): Promise<string> {
    const newProvinsi: provinsiModel = {
      docType: "provinsi",
      nama,
    };

    await ctx.stub.putState(uuidv1(), Buffer.from(JSON.stringify(newProvinsi)));

    return "Data berhasil ditambahkan";
  }

  public async getAll(ctx: Context): Promise<string> {
    const qs = queryString({ docType: "provinsi" });

    const results = await ctx.stub.getQueryResult(JSON.stringify(qs));

    const wrappedResults = await wrapResult(results);

    return wrappedResults;
  }
}
