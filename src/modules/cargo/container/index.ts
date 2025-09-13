import {container} from "tsyringe";
import {CargoRepository} from "@modules/cargo/infra/mongo/repositories/CargoRepository";
import {ICargoRepository} from "@modules/cargo/repositories/ICargoRepository";


container.registerSingleton<ICargoRepository>(
  "CargoRepository",
  CargoRepository
);