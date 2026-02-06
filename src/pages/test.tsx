import { Footer } from "../components/shared/footer";

const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-surface text-fg">
      <div className="container mx-auto px-4 py-20">
        <h1 className="mb-4 font-bold text-4xl">Test Page</h1>
        <p className="text-lg text-muted">
          This is a test route to verify the Footer component.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
