import { Separator } from "./separator";

export function Footer() {
  return (
    <footer>
      <Separator />

      <div className="mx-auto flex max-w-7xl justify-center p-2">
        <p className="text-center font-medium text-balance">
          {`©${new Date().getFullYear()}`}{" "}
          <a className="text-primary-foreground" href="#">
            Despache Já
          </a>
          , Feito por Cristhian Eduardo.
        </p>
      </div>
    </footer>
  );
}
