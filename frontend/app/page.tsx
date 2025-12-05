import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">
            Bem-vindo ao DespacheJá Desktop
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Digite algo..." />

          <Button className="w-full">Enviar</Button>

          <Separator />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>O que é este app?</AccordionTrigger>
              <AccordionContent>
                Um app desktop criado com Electron + Next.js + Nest.js + ShadCN
                + Tailwind 4.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
