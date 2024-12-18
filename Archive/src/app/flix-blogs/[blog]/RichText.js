import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import '@/Styles/flix-blogs/flix-blogs.css';
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

function RichText({ data }) {
  return (
    <>
      <div className={"flix-blog " + plus_jakarta_sans.className}>
        <BlocksRenderer content={data} />
      </div>
    </>
  );
}

export default RichText;
