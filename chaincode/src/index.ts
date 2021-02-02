/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { FabCar } from "./fabcar";
import { User } from "./contracts/admin/user";

export { FabCar } from "./fabcar";
export { User } from "./contracts/admin/user";

export const contracts: any[] = [User, FabCar];
