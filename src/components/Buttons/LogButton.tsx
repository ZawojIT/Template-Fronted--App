import { Button } from "@mui/material";
import React, { FC } from "react";

interface LogButtonProps {
  label: string;
  logText: string;
  variant: "text" | "outlined" | "contained";
  onLoadLogText?: string;
}

const LogButton: FC<LogButtonProps> = (props) => {
  const { label, logText, variant, onLoadLogText } = props;

  if (onLoadLogText) {
    console.log(onLoadLogText);
  }

  return (
    <Button variant={variant} onClick={() => console.log(logText)}>
      {label}
    </Button>
  );
};

export default LogButton;
