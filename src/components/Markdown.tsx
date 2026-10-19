import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";
import { extractText, slugify } from "../docs";

interface Props {
  body: string;
}

const components: Components = {
  h1: ({ node: _node, ...props }) => <h1 className="doc-title" {...props} />,
  h2: ({ node: _node, children, ...props }) => (
    <h2 id={slugify(extractText(children))} {...props}>
      {children}
    </h2>
  ),
  h3: ({ node: _node, children, ...props }) => (
    <h3 id={slugify(extractText(children))} {...props}>
      {children}
    </h3>
  ),
  a: ({ node: _node, href, children, ...props }) => {
    if (href?.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export default function Markdown({ body }: Props) {
  return (
    <div className="doc">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
