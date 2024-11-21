import dynamic from "next/dynamic";
import Header from "@/components/Header";

const TreeMap = dynamic(() => import("../components/TreeMap"), { ssr: false });

export default function Home() {

  return (
    <div className="w-full h-full min-h-screen bg-background">
        <Header/>
        <TreeMap/>
    </div>
  );
}
