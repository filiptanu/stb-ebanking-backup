# STB eBanking Backup

Automatically back up your warrants from the [STB eBanking web app](https://ebank.stb.com.mk/).

## **DISCLAIMER**

This is an **UNOFFICIAL** tool. It is **not** developed by [Стопанска Банка А.Д. Скопје](https://www.stb.com.mk/). It is a piece of software owned and maintained by a [me](https://filip.mk). Use it at your own risk.

## Prerequisites

In order to be able to build the project, the following dependencies are required to be installed:

- Node.js

## Running the Backup Tool

### Install Dependencies

In a terminal, navigate to the root directory of the project and execute:

```
npm install
```

to install the project's dependencies.

### Set Up Environment Variables

Next, run:

```
cp example.cypress.env.json cypress.env.json
```

and populate the requred environment variables inside the newly created `example.cypress.env.json` file:

- `USERNAME` - your username for the STB ebanking web app
- `USERNAME` - your password for the STB ebanking web app
- `ACCOUNT_NUMBER` - the account number for which you want to back up your warrants
- `YEAR` - the year for which you want to back up your warrants
- `MONTH` - the month for which you want to back up your warrants
- `WARRANTS_TO_IGNORE` - a comma separated warrant labels to ignore (e.g. you might not want to back up warrants sent between your accounts)

### Run the Backup Tool

You need to set up the `BACKUP_DEST` environment variable, so the tool can know where to copy the backed up warrants:

```
$Env:BACKUP_DEST = "C:\Users\<your-username>\backup" # if you are on Windows

or

export BACKUP_DEST="/home/<your-username>/backup" # if you are on Linux
```

Finally, you can run:

```
npm run stb-ebanking-backup-windows

or 

npm run stb-ebanking-backup-linux
```

to run the backup tool. You can see your backed up warrants in the `BACKUP_DEST` location that you previously specified.
