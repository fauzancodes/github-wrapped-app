# GitHub Wrapped App

Welcome to the **GitHub Wrapped App**. This desktop application is built with modern technologies to deliver high performance and an optimized user experience. Powered by [Go](https://go.dev/) for data processing, [GORM]("https://gorm.io/") for efficient database connections, and [PostgreSQL]("https://www.postgresql.org/") as a reliable database, it ensures speed and robustness. On the frontend, [Next.JS](https://nextjs.org/), [TailwindCSS]("https://tailwindcss.com/"), and [DaisyUI]("https://daisyui.com/") are utilized to create a responsive and visually appealing UI/UX. All components are seamlessly integrated into a desktop application using [Wails](https://wails.io/), resulting in a professional and cohesive solution.

It connects directly to GitHub's platform using the user's [GitHub Personal Access Token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic), providing detailed insights into user activity across both public and private repositories. The App ensures high performance, security, and transparency, without storing sensitive user data.

## Features

- **Comprehensive Follower & Unfollwer Insights**  
  Retrieve the total number of followers & unfollowers and their detailed list to analyze user engagement.

- **Detailed Following & Unfollowing Information**  
  Get the total number of followings & unfollowings along with a complete list.

- **Repository Analysis**  
  - Fetch the total number of repositories owned by the user along with a detailed list.  
  - Retrieve the total commits for each repository within a specified date range.

- **Forked Repository Insights**  
  - Get the total number of repositories forked by the user along with a detailed list.  
  - Analyze the total commits made to each forked repository within a specified date range.

- **Contribution to External Repositories**  
  - Discover repositories where the user has contributed but doesn't own.  
  - View the total commits for each repository contributed to within a specified date range.

- **Starred Repository Metrics**  
  - Fetch the total stars the user has given to repositories along with a detailed list.  
  - Filter the results based on a date range for targeted analysis.

- **Received Star Insights**  
  - Retrieve the total stars received by the user’s repositories.  
  - View which repositories received stars and the contributors who gave them within a specified date range.

- **Favorite Languages Analysis**  
  Determine the user's favorite programming languages based on the total bytes of code written in owned repositories.

- **Secure Personal Access Token Usage**  
  The API requires the user's GitHub Personal Access Token (PAT) for data access.  
  - **No Token Storage**: Tokens are used in memory during the session and are not stored in the application.  
  - **User Control**: Users can verify the source code, clone the repository, and run the application locally to ensure transparency.  
  - **Token Revocation**: Tokens can be revoked from GitHub after use for additional peace of mind.

## How to Use?

Please download the windows installer from the [release page](https://github.com/fauzancodes/github-wrapped-app/releases/tag/v1.0.0).

## Warning

I do not store your Github Personal Access Token data, if you don't believe me, please check the code, or if you want to be more comfortable, please delete your github personal access token after doing the analysis or build this project yourself with the source code that I have provided.

## How to Build?

1. Install [Go](https://go.dev/)
2. Install [Node](https://nodejs.org/en)
3. Install [NSIS](https://wails.io/docs/guides/windows-installer/#installing-nsis), optional
4. Install [UPX](https://upx.github.io/), optional
5. Clone this repository
6. Provide database connection in the `.env` file
7. Run `wails build -clean -obfuscated -nsis -upx`.

## Additional Notes

Generation time for the data can vary significantly depending on the amount of data associated with the GitHub account. Users with extensive activity or large repositories may experience longer processing times.

---

© 2025 GitHub Wrapped App Project. All rights reserved. By [fauzancodes](https://fauzancodes.id/).
