import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="mt-32 mb-8">
        <h1 className="text-center font-black text-4xl">
          Welcome to the Github Wrapped App
        </h1>
      </header>
      <main className="flex flex-wrap justify-center gap-8 pb-10">
        <p className="font-medium text-center !mx-5 w-full md:w-7/12">
          This App is built using the <Link href="https://go.dev/" target="_blank">Go</Link> programming language with the <Link href="https://wails.io/" target="_blank">Wails</Link> framework, leveraging <Link href="https://gorm.io/" target="_blank">GORM</Link> as the ORM for database connections. <Link href="https://www.postgresql.org/" target="_blank">PostgreSQL</Link> is used as the main database, ensuring high performance and scalability.
        </p>
        <p className="font-medium text-center !mx-5 w-full md:w-7/12">
          It connects directly to GitHub&#39;s platform using the user&#39;s <Link href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic" target="_blank">Personal Access Token (Classic)</Link>, providing detailed insights into user activity across both public and private repositories. The App ensures high performance, security, and transparency, without storing sensitive user data.
        </p>
        <section className="w-full text-center">
          <Link href="/analyze" className="btn btn-primary font-bold text-lg hover:text-base-100">Start Analyzing</Link>
        </section>
        <section>
          <ul className="flex flex-wrap gap-5 justify-center mx-5 md:mx-0">
            <li className="w-full md:w-3/12"><strong>Comprehensive Follower & Unfollower Insights:</strong> Retrieve the total number of followers and unfollowers along with their detailed lists to analyze user engagement effectively.</li>
            <li className="w-full md:w-3/12"><strong>Detailed Following & Unfollowing Information:</strong> Access the total number of followings and unfollowings, complete with a detailed list for in-depth tracking.</li>
            <li className="w-full md:w-3/12"><strong>Repository Analysis:</strong> Fetch the total number of repositories owned by the user along with a comprehensive list and retrieve the total commits for each repository within a specified date range for targeted analysis.</li>
            <li className="w-full md:w-3/12"><strong>Forked Repository Insights:</strong> Analyze the total number of repositories forked by the user along with their detailed lists and examine the total commits made to each forked repository within a specific date range.</li>
            <li className="w-full md:w-3/12"><strong>Contribution to External Repositories:</strong> Discover repositories where the user has contributed but does not own and view the total commits for each contributed repository within a specified date range.</li>
            <li className="w-full md:w-3/12"><strong>Starred Repository Metrics:</strong> Fetch the total stars the user has given to repositories, along with a detailed list and filter the results by date range for more focused insights.</li>
            <li className="w-full md:w-3/12"><strong>Received Star Insights:</strong> Retrieve the total stars received by the user&#39;s repositories and identify which repositories received stars and who gave it within a specified date range.</li>
            <li className="w-full md:w-3/12"><strong>Favorite Languages Analysis:</strong> Determine the user&#39;s favorite programming languages based on the total bytes of code written in owned repositories.</li>
            <li className="w-full md:w-3/12"><strong>No Token Storage:</strong> Tokens are used in memory during the session and are not stored in the application.</li>
            <li className="w-full md:w-3/12"><strong>User Control:</strong> Users can verify the source code, clone the repository, and run the application locally to ensure transparency.</li>
            <li className="w-full md:w-3/12"><strong>Token Removal:</strong> Tokens can be removed from GitHub after use for additional peace of mind.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
