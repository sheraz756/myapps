import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ReactCopyClipboard = () => {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <input
        value={"shorturl.at/DINP9"}
        onChange={({ target: { value } }) => {
          setValue(value);
          setCopied(false);
        }}
      />
      {/* <br />
      <br /> */}
      <CopyToClipboard text={"shorturl.at/DINP9"} onCopy={() => setCopied(true)}>
      <button>Meeting Invitaion</button>
      </CopyToClipboard>
      <br />
      <br />
      {/* <CopyToClipboard text={"shorturl.at/gkZ79"} onCopy={() => setCopied(true)}>
      <button>Meeting Invitaion</button>
      </CopyToClipboard> */}
      {/* <br />
      <br /> */}
      {copied ? <span style={{ color: "green" }}>Copied.</span> : null}
      <br />
      <br />
      {/* <textarea /> */}
    </div>
  );
};

export default ReactCopyClipboard