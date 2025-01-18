# GitHub Wrapped App

Welcome to the **GitHub Wrapped App**. This App is built using [Go](https://go.dev/) with the [Wails](https://wails.io/) framework. It connects directly to GitHub's platform using the user's [GitHub Personal Access Token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic), providing detailed insights into user activity across both public and private repositories. The API ensures high performance, security, and transparency, without storing sensitive user data.

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

## How to Build?

1. Install [Go](https://go.dev/)
2. Install [NSIS](https://wails.io/docs/guides/windows-installer/#installing-nsis), optional
3. Install [UPX](https://upx.github.io/), optional
2. Clone this repository
3. Provide database connection in the `.env` file
4. Run `wails build -clean -obfuscated -nsis -upx`.

### Warning

I do not store your Github Personal Access Token data, if you don't believe me, please check the code, or if you want to be more comfortable, please build this project yourself.

### Additional Notes

Generation time for the data can vary significantly depending on the amount of data associated with the GitHub account. Users with extensive activity or large repositories may experience longer processing times.

---

© 2025 GitHub Wrapped API Project. All rights reserved. By [fauzancodes](https://fauzancodes.id/).
