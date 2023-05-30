import Feed from '@/components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share&nbsp;
        <br className="max-md:hidden" />
        <span className="orange_gradient">
          AI-Powered Prompts
        </span>

      </h1>
      <p className="desc text-center">
        Promptopia is an open-source project that uses AI to generate writing prompts.
      </p>

      <Feed />
      
    </section>
  )
};

export default Home;
