"use client";
import * as React from "react";

function onlyDigits(v: string) { return v.replace(/\D+/g, ""); }
function formatCPF(input: string) {
  let v = onlyDigits(input).slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
}

export function CpfInput(props: {
  id?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
  onValue?: (digits: string) => void;
}) {
  const [value, setValue] = React.useState(
    props.defaultValue ? formatCPF(props.defaultValue) : ""
  );
  const [ph, setPh] = React.useState("CPF");

  return (
    <input
      id={props.id ?? "cpf"}
      name={props.name ?? "cpf"}
      required={props.required}
      value={value}
      onFocus={() => setPh("000.000.000-00")}
      onBlur={() => { if (!value) setPh("CPF"); }}
      onChange={(e) => {
        const f = formatCPF(e.target.value);
        setValue(f);
        props.onValue?.(onlyDigits(f));
      }}
      inputMode="numeric"
      autoComplete="username"
      placeholder={ph}
      maxLength={14}
      pattern={"^\\d{11}$|^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"}
      className={props.className ?? "input"}
      autoFocus={props.autoFocus}
    />
  );
}
