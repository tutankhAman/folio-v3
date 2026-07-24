import type React from "react";

interface TechItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const JavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="JavaScript"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/javascript.svg"
    width={16}
  />
);

const TypeScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="TypeScript"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/typescript.svg"
    width={16}
  />
);

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Python"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/python.svg"
    width={16}
  />
);

const CppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="C++"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/cpp.svg"
    width={16}
  />
);

const RustIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Rust"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/rust.svg"
    width={16}
  />
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="React.js"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/react.svg"
    width={16}
  />
);

const NextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Next.js"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/nextjs.svg"
    width={16}
  />
);

const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Tailwind CSS"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/tailwindcss.svg"
    width={16}
  />
);

const ViteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Vite"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/vite.svg"
    width={16}
  />
);

const ElectronIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Electron"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/electron.svg"
    width={16}
  />
);

const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="HTML"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/html.svg"
    width={16}
  />
);

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="CSS"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/css.svg"
    width={16}
  />
);

const NodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Node.js"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/nodejs.svg"
    width={16}
  />
);

const BunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Bun"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/bun.svg"
    width={16}
  />
);

const ElysiaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Elysia"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/elysia.svg"
    width={16}
  />
);

const ExpressIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Express.js"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/express.svg"
    width={16}
  />
);

const RestApiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="REST APIs"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/restapi.svg"
    width={16}
  />
);

const WebSocketsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="WebSockets"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/websockets.svg"
    width={16}
  />
);

const PostgresIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="PostgreSQL"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/postgresql.svg"
    width={16}
  />
);

const RedisIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Redis"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/redis.svg"
    width={16}
  />
);

const RabbitMQIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="RabbitMQ"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/rabbitmq.svg"
    width={16}
  />
);

const MongoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="MongoDB"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/mongodb.svg"
    width={16}
  />
);

const SupabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Supabase"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/supabase.svg"
    width={16}
  />
);

const CloudflareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Cloudflare"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/cloudflare.svg"
    width={16}
  />
);

const AwsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="AWS"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/aws.svg"
    width={16}
  />
);

const AzureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="Azure"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/azure.svg"
    width={16}
  />
);

const GcpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img
    alt="GCP"
    className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:invert ${props.className || ""}`}
    height={16}
    src="/icons/gcp.svg"
    width={16}
  />
);

const LANGUAGES: TechItem[] = [
  { name: "JavaScript", icon: JavaScriptIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Python", icon: PythonIcon },
  { name: "C++", icon: CppIcon },
  { name: "Rust", icon: RustIcon },
];

const FRONTEND: TechItem[] = [
  { name: "React.js", icon: ReactIcon },
  { name: "Next.js", icon: NextJsIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "Vite", icon: ViteIcon },
  { name: "Electron", icon: ElectronIcon },
  { name: "HTML", icon: HtmlIcon },
  { name: "CSS", icon: CssIcon },
];

const BACKEND_CLOUD: TechItem[] = [
  { name: "Node.js", icon: NodeIcon },
  { name: "Bun", icon: BunIcon },
  { name: "Elysia", icon: ElysiaIcon },
  { name: "Express.js", icon: ExpressIcon },
  { name: "REST APIs", icon: RestApiIcon },
  { name: "WebSockets", icon: WebSocketsIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "Redis", icon: RedisIcon },
  { name: "RabbitMQ", icon: RabbitMQIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "Supabase", icon: SupabaseIcon },
  { name: "Cloudflare", icon: CloudflareIcon },
  { name: "AWS", icon: AwsIcon },
  { name: "Azure", icon: AzureIcon },
  { name: "GCP", icon: GcpIcon },
];

const CATEGORIES = [
  { title: "Languages", items: LANGUAGES },
  { title: "Frontend", items: FRONTEND },
  { title: "Backend & Cloud", items: BACKEND_CLOUD },
];

export function TechStack() {
  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => (
        <div key={cat.title}>
          <h3 className="mb-3 font-mono font-normal text-neutral-400 text-xs uppercase tracking-widest">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cat.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="group flex items-center gap-2.5 border border-neutral-300 border-dashed bg-neutral-50/50 px-3.5 py-2 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-900"
                  key={item.name}
                >
                  <Icon className="h-4 w-4 shrink-0 transition-colors" />
                  <span className="font-medium font-poppins text-neutral-800 text-xs transition-colors group-hover:text-white">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
