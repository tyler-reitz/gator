import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(currentUserName: string): void {
  writeConfig({ ...readConfig(), currentUserName });
}

export function readConfig(): Config {
  const configJSON = fs.readFileSync(getConfigFilePath(), { encoding: "utf8" });
  return validateConfig(configJSON);
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
  const { dbUrl: db_url, currentUserName: current_user_name } = cfg;
  fs.writeFileSync(
    getConfigFilePath(),
    JSON.stringify({ db_url, current_user_name }, null, 2),
    { encoding: "utf8" },
  );
}

function validateConfig(rawConfig: any): Config {
  const { db_url: dbUrl, current_user_name: currentUserName } =
    JSON.parse(rawConfig);

  return { dbUrl, currentUserName };
}
