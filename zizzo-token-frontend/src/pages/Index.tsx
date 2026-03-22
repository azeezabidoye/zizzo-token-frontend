import Header from "@/components/Header";
import TokenInfo from "@/components/TokenInfo";
import MintForm from "@/components/MintForm";
import TransferForm from "@/components/TransferForm";
import Faucet from "@/components/Faucet";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 space-y-8">
        <TokenInfo />

        <section>
          <h2
            className="text-xl font-semibold text-brand-deep mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.08s" }}
          >
            Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MintForm />
            <TransferForm />
            <Faucet />
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-4">
        <div className="container text-center text-xs text-muted-foreground">
          ZizzoToken dApp — Mock Interface
        </div>
      </footer>
    </div>
  );
}
