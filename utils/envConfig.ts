// export const BASE_URL="https://www.saucedemo.com/"
declare const process: {
    env?: Record<string, string | undefined>;
};

const ENV_URL={
    dev:"https://www.saucedemo.com/",
    qa:"https://www.saucedemo.com/",
    stage:"https://www.saucedemo.com/",
    prod:"https://www.saucedemo.com/",

}
const ENV=process?.env?.ENV || "prod"
export const BASE_URL=(ENV_URL as any)[ENV]

export const USERNAME="standard_user"
export const PASSWORD="secret_sauce"


/*
from folder terminal

$env:ENV="dev";
npx playwright test tests/E2E

$env:ENV="qa";
npx playwright test tests/E2E

$env:ENV="stage";
npx playwright test tests/E2E

$env:ENV="prod";
npx playwright test tests/E2E

*/