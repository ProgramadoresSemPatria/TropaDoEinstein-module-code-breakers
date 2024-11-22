import dynamic from "next/dynamic";
import Header from "@/components/Header";
import AsideSection from "@/components/AsideSection";
import ModalSection from "@/components/ModalSection";

const TreeMap = dynamic(() => import("../components/TreeMap"), { ssr: false });

export default function Home() {

  return (
    <>
      <Header/>
      <main className="w-full h-full min-h-screen bg-background text-white overflow-hidden relative z-0">
          <TreeMap/>
          <AsideSection/>
          <ModalSection/>
      </main>
    </>
  );
}
