"use client";
import * as React from "react";

function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}
function formatCPF(input: string) {
  let v = onlyDigits(input).slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
}

/**
 * Input controlado para CPF.
 * - Aplica máscara ao digitar
 * - Aceita só dígitos ou com máscara
 * - Mostra placeholder "000.000.000-00"
 */
export function CpfInput(props: {
  id?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  const [value, setValue] = React.useState(
    props.defaultValue ? formatCPF(props.defaultValue) : ""
  );
  return (
    <input
      id={props.id ?? "cpf"}
      name={props.name ?? "cpf"}
      required={props.required}
      value={value}
      onChange={(e) => setValue(formatCPF(e.target.value))}
      inputMode="numeric"
      autoComplete="username"
      placeholder="000.000.000-00"
      maxLength={14}
      // aceita "00000000000" OU "000.000.000-00"
      pattern={"^\\d{11}$|^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"}
      className={props.className ?? "input"}
      autoFocus={props.autoFocus}
    />
  );
}
