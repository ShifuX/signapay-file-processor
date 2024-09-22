"use client";
import { ChangeEvent, FormEvent, useState } from "react";

interface ParsedData {
  data: {
    accountName: string;
    cardNumber: string;
    transactionAmount: string;
    type: string;
    description: string;
    targetCardNumber: string;
  }[];
}

interface ParsedDataRow {
  accountName: string;
  cardNumber: string;
  transactionAmount: string;
  type: string;
  description: string;
  targetCardNumber: string;
}

export default function Home() {
  const [file, setFile] = useState<File[]>();
  const [badData, setBadData] = useState<ParsedDataRow[]>();
  const [collections, setCollections] = useState<ParsedDataRow[]>();
  const [goodData, setGoodData] = useState<ParsedDataRow[]>();

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let filesUploaded = e.target.files;
    let fileArray: File[] = [];
    if (filesUploaded) {
      Array.from(filesUploaded).forEach((f) => {
        fileArray.push(f);
      });

      setFile(fileArray);
      console.log("Submit");
    }
  };

  const parseText = (text: string): ParsedData => {
    const lines = text.split("\n");
    const items = lines.map((line) => line.split(","));

    const itemsProcessed: ParsedData = {
      data: items.map((item) => {
        return {
          accountName: item[0],
          cardNumber: item[1],
          transactionAmount: item[2],
          type: item[3],
          description: item[4],
          targetCardNumber: item[5],
        };
      }),
    };

    return itemsProcessed;
  };

  const validType = (type: string): boolean => {
    const validTypes = ["Transfer", "Credit", "Debit"];
    let match = false;
    validTypes.forEach((element) => {
      if (type.toLowerCase().trim() === element.toLowerCase()) {
        match = true;
      }
    });

    return match;
  };

  const processData = (text: string) => {
    const badDataTemp: ParsedDataRow[] = [];
    const collectionAccounts: ParsedDataRow[] = [];
    const validData: ParsedDataRow[] = [];

    const parsedData = parseText(text);

    console.log(parsedData);
    parsedData?.data.forEach((row) => {
      if (!validType(row.type)) {
        badDataTemp.push(row);
      } else if (row.type === "transfer" && row.targetCardNumber === "") {
        // bad data targetCardNumber not included when type is transfer
        badDataTemp.push(row);
      } else if (row.transactionAmount.charAt(0) === "-") {
        // amount is negative
        collectionAccounts.push(row);
      } else {
        validData.push(row);
      }
    });

    setBadData((prevData = []) => [...prevData, ...badDataTemp]);
    setCollections((prevData = []) => [...prevData, ...collectionAccounts]);
    setGoodData((prevData = []) => [...prevData, ...validData]);
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();

        // Start reading the file as text
        reader.readAsText(file[i]);

        // Event listener that triggers after the file is read
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const content = event.target?.result as string; // File content as string

          // Parse the text here
          processData(content);
        };
      }
    }

    console.log("Form Submitted");
  };

  return (
    <div className="">
      <div className="flex justify-center items-center pt-10">
        <div className="w-2/5 desktop2k:w-2/5 desktop1080:w-2/5 laptop:w-2/5 tablet:w-3/5 h-48 shadow-md border-2 border-grey-100 ">
          <form
            action=""
            onSubmit={HandleSubmit}
            className="flex flex-col justify-center items-center space-y-5"
          >
            <div className=" desktop2k:pl-72 desktop1080:pl-72 laptop:pl-72 tablet:pl-52 pt-5">
              <input type="file" onChange={HandleChange} multiple required />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-400 rounded-md w-20 h-10 text-center text-white hover:bg-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-row space-x-96">
        <div className="text-center pt-10">
          <p className="pb-10">Good Data</p>
          <div className="flex flex-col space-y-8  h-full">
            {goodData
              ? goodData.map(function (row, index) {
                  return (
                    <div
                      className=" text-black shadow-md p-2 h-40 w-72 text-wrap"
                      key={index}
                    >
                      <div>{row.accountName}</div>
                      <div>{row.cardNumber}</div>
                      <div>{row.description}</div>
                      <div>{row.targetCardNumber}</div>
                      <div>{row.transactionAmount}</div>
                      <div>{row.type}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className="text-center pt-10">
          <p className="pb-10">Collections</p>
          <div className="flex flex-col space-y-8 h-full">
            {collections
              ? collections.map(function (row, index) {
                  return (
                    <div
                      className=" text-black shadow-md p-2 h-40 w-72 text-wrap"
                      key={index}
                    >
                      <div>{row.accountName}</div>
                      <div>{row.cardNumber}</div>
                      <div>{row.description}</div>
                      <div>{row.targetCardNumber}</div>
                      <div>{row.transactionAmount}</div>
                      <div>{row.type}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className="text-center pt-10">
          <p className="pb-10">Bad Data</p>
          <div className="flex flex-col space-y-8 h-full">
            {badData
              ? badData.map(function (row, index) {
                  return (
                    <div
                      className=" text-black shadow-md p-2 text-wrap"
                      key={index}
                    >
                      <div>{row.accountName}</div>
                      <div>{row.cardNumber}</div>
                      <div>{row.description}</div>
                      <div>{row.targetCardNumber}</div>
                      <div>{row.transactionAmount}</div>
                      <div>{row.type}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
