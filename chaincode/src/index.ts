/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { FabCar } from "./fabcar";
import { User } from "./contracts/admin/user";
import { Provinsi } from "./contracts/admin/provinsi";

export { FabCar } from "./fabcar";
export { User } from "./contracts/admin/user";
export { Provinsi } from "./contracts/admin/provinsi";

export const contracts: any[] = [User, FabCar, Provinsi];
