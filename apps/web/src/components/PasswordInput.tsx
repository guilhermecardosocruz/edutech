"use client";
import * as React from "react";

function calcStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  // escala 0..5
  return score;
}

export function PasswordInput(props: {
  id?: string;
  name?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  showStrength?: boolean;
}) {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState("");
  const strength = calcStrength(value);
  const labels = ["Muito fraca", "Fraca", "Ok", "Boa", "Forte", "Excelente"];

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          id={props.id ?? "password"}
          name={props.name ?? "password"}
          type={show ? "text" : "password"}
          required={props.required}
          minLength={props.minLength ?? 8}
          autoComplete={props.autoComplete ?? "current-password"}
          placeholder={props.placeholder ?? "Senha"}
          className={props.className ?? "input pr-10"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-100"
          onClick={() => setShow((s) => !s)}
        >
          {/* Olhinho simples em SVG */}
          {show ? (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </button>
      </div>

      {props.showStrength && (
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-neutral-200 rounded">
            <div
              className="h-1.5 rounded transition-[width]"
              style={{
                width: `${(strength / 5) * 100}%`,
                background: strength >= 4 ? "#16a34a" : strength >= 3 ? "#eab308" : "#ef4444",
              }}
            />
          </div>
          <p className="text-xs text-neutral-600">{labels[strength]}</p>
        </div>
      )}
    </div>
  );
}
