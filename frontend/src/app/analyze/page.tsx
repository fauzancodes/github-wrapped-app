"use client"

import { useEffect, useState } from "react"
import { FaIdBadge, FaKey } from "react-icons/fa6"
import { GenerateData, GetData } from "../../../wailsjs/go/main/App"
import { dto, models } from "../../../wailsjs/go/models"
import Summary from "../ui/main/analyze/summary"
import Table from "../ui/main/analyze/table"


const Page = () => {
  const [isLoadingAnalyzing, setIsLoadingAnalyzing] = useState(false)
  const [isLoadingFetching, setIsLoadingFetching] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [personalAccessToken, setPersonalAccessToken] = useState("")
  const [dataId, setDataId] = useState("")
  const [data, setData] = useState<models.GWAResult | null>(null)
  const [error, setError] = useState("")

  const fetchData = async (useLoading: boolean) => {
    try {
      setError("")
      if (useLoading) {
        setIsLoadingFetching(true)
      }
      
      const result = await GetData(dataId)
      if (result) {
        setData(result)
      }
      
      handleClearAnalyzingForm()
      if (useLoading) {
        setIsLoadingFetching(false)
      }
    } catch(error) {
      if (
        String(error).includes("failed to parse uuid") || 
        String(error).includes("failed to get data") || 
        String(error).includes("failed to convert data to json")
      ) {
        setError(String(error))
      } else {
        console.error("Error fetch data:", error)
      }
      
      setData(null)
      handleClearAnalyzingForm()
      if (useLoading) {
        setIsLoadingFetching(false)
      }
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setError("")
      setIsLoadingAnalyzing(true)
      setDataId("")

      const requestData = new dto.Request({
        personal_access_token: personalAccessToken,
        start_date: startDate,
        end_date: endDate,
        data_id: dataId
      })
      const result = await GenerateData(requestData)
      if (result) {
        setDataId(result.id.toString())
        setData(result)
        handleClearAnalyzingForm()
      }
        
      setIsLoadingAnalyzing(false)
    } catch(error) {
      if (
        String(error).includes("failed to validate request") || 
        String(error).includes("failed to generate data")
      ) {
        setError(String(error))
      } else {
        console.error("Error generate data:", error)
      }
      
      setData(null)
      handleClearAnalyzingForm()
      setIsLoadingAnalyzing(false)
    }
  }

  const handleGetData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetchData(true)
  }

  const handleClearAnalyzingForm = () => {
    setStartDate("")
    setEndDate("")
    setPersonalAccessToken("")
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (dataId && dataId !== null && dataId !== "" && data && data !== null && data?.progress !== "100%") {
      interval = setInterval(() => {
        fetchData(false)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [data])

  useEffect(() => {
    if (!dataId || dataId === null || dataId == "") {
      setData(null)
    }
  }, [dataId])
  
  return (
    <main className="mt-32 pb-10 min-h-screen">
      <header className="mb-8">
        <h1 className="text-center font-black text-4xl">
          Start Your GitHub Analysis Here
        </h1>
      </header>
      <form className="flex flex-col flex-wrap gap-5 w-full items-center px-10" onSubmit={handleSubmit}>
        <label className="form-control w-full md:w-6/12">
          <div className="label">
            <span className="label-text font-medium">Please select a date range:</span>
          </div>
          <div className="flex flex-wrap gap-5 justify-between">
            <label className="input input-bordered input-primary flex items-center gap-2 w-full md:w-[48.5%]">
              <span className="font-medium">Start:</span>
              <input
                type="date"
                className="grow border-0 active:border-0 duration-0 caret-primary"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="input input-bordered input-primary flex items-center gap-2 w-full md:w-[48.5%]">
              <span className="font-medium">End:</span>
              <input
                type="date"
                className="grow border-0 active:border-0 duration-0 caret-primary"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        </label>
        <label className="form-control w-full md:w-6/12">
          <div className="label">
            <span className="label-text font-medium">Input your github personal access token (classic):</span>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <FaKey className="text-primary" />
            <input
              type="password"
              className="grow border-0 active:border-0 duration-0 caret-primary"
              placeholder="Your github personal access token"
              value={personalAccessToken}
              onChange={(e) => setPersonalAccessToken(e.target.value)}
              required
            />
          </label>
        </label>
        <section className="w-full text-center">
          <button type="submit" className="btn btn-primary font-bold text-lg hover:text-base-100" disabled={isLoadingAnalyzing}>
            {isLoadingAnalyzing ? "Analyzing....." : "Start Analyzing"}
          </button>
        </section>
      </form>
      <form className="mt-10 flex flex-col flex-wrap gap-5 w-full items-center px-10" onSubmit={handleGetData}>
        <label className="form-control w-full md:w-6/12">
          <div className="label">
            <span className="label-text font-medium">Or, if you have generated analysis before, please enter the data id here:</span>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <FaIdBadge className="text-primary" />
            <input
              type="text"
              className="grow border-0 active:border-0 duration-0 caret-primary"
              placeholder="Your data id"
              value={dataId}
              onChange={(e) => setDataId(e.target.value)}
            />
          </label>
        </label>
        <section className="w-full text-center">
          <button type="submit" className="btn btn-primary font-bold text-lg hover:text-base-100" disabled={isLoadingFetching}>
            {isLoadingFetching ? "Fetching Data....." : "Fetch Data"}
          </button>
        </section>
      </form>
      {error && <p className="text-base-100 bg-accent rounded-xl !px-3 !py-2 w-fit text-center !my-10 !mx-10 md:!mx-auto">{error}</p>}
      {
        data && (
          <section className="mt-24 w-full flex flex-col items-center gap-5">
            {
              data?.progress !== "100%" ? (
                <>
                  <span>{data?.message}</span>
                  <div className="w-full flex justify-center items-center">
                    <progress className="progress progress-primary w-6/12 h-7" value={data?.progress.replaceAll("%", "")} max="100"></progress>
                    <span className="absolute font-semibold text-base-100">{data?.progress}</span>
                  </div>
                </>
              ) : (
                <>
                  <div id="result" className="w-11/12 md:w-10/12 border-b border-bottom border-primary">
                    <h2 className="font-black text-4xl !mb-2">Result</h2>
                    <div className="mb-2">
                      <span className="font-medium">Data Id: </span>
                      <span className="font-bold">{data?.id}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Start Date: </span>
                      <span className="font-bold">{data?.start_date}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">End Date: </span>
                      <span className="font-bold">{data?.end_date}</span>
                    </div>
                    <div className="mb-5">
                      <span className="font-medium">Username: </span>
                      <span className="font-bold">{data?.username}</span>
                    </div>
                  </div>
                  <Summary 
                    title="Repository Summary" 
                    detail={[
                      {
                        title: "Total Repositories: ",
                        data: data?.data?.repositories.total,
                      },
                      {
                        title: "Total Commits: ",
                        data: data?.data?.repositories.total_commits,
                      },
                      {
                        title: "Total Repositories Owned: ",
                        data: data?.data?.repositories.repository_owned.total,
                      },
                      {
                        title: "Total Commits On Repositories Owned: ",
                        data: data?.data?.repositories.repository_owned.total_commits,
                      },
                      {
                        title: "Total Repositories Contributed: ",
                        data: data?.data?.repositories.repository_contributed.total,
                      },
                      {
                        title: "Total Commits On Repositories Contributed: ",
                        data: data?.data?.repositories.repository_contributed.total_commits,
                      },
                      {
                        title: "Total Repositories Forked: ",
                        data: data?.data?.repositories.repository_forked.total,
                      },
                      {
                        title: "Total Commits On Repositories Forked: ",
                        data: data?.data?.repositories.repository_forked.total_commits,
                      },
                    ]}
                  />
                  {data?.data?.repositories.repository_owned && data.data.repositories.repository_owned.total > 0 && <Table 
                    title="Repository Owned"
                    headers={["Repository Name", "Total Commits"]}
                    firstColumn={data?.data?.repositories.repository_owned.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.name)}
                    secondColumn={data?.data?.repositories.repository_owned.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.total_commits)}
                  />}
                  {data?.data?.repositories.repository_contributed && data.data.repositories.repository_contributed.total > 0 && <Table 
                    title="Repository Contributed"
                    headers={["Repository Name", "Total Commits"]}
                    firstColumn={data?.data?.repositories.repository_contributed.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.name)}
                    secondColumn={data?.data?.repositories.repository_contributed.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.total_commits)}
                  />}
                  {data?.data?.repositories.repository_forked && data.data.repositories.repository_forked.total > 0 && <Table 
                    title="Repository Forked"
                    headers={["Repository Name", "Total Commits"]}
                    firstColumn={data?.data?.repositories.repository_forked.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.name)}
                    secondColumn={data?.data?.repositories.repository_forked.detail.sort((a, b) => b.total_commits - a.total_commits).map((item) => item.total_commits)}
                  />}
                  <Summary 
                    title="Star Summary"
                    detail={[
                      {
                        title: "Total Starred Repositories: ",
                        data: data?.data?.starreds.total,
                      },
                      {
                        title: "Total Stargazers: ",
                        data: data?.data?.startgazers.total,
                      },
                    ]}
                  />
                  {data?.data?.starreds.detail && data.data.starreds.total > 0 && <Table 
                    title="Starred Repositories"
                    headers={["Repository Name"]}
                    firstColumn={data?.data?.starreds.detail.sort().map((item) => item)}
                  />}
                  {data?.data?.startgazers.detail && data.data.startgazers.total > 0 && <Table 
                    title="Stargazers"
                    headers={["Repository Name", "Star Giver"]}
                    firstColumn={data?.data?.startgazers.detail.sort().map((item) => item.split(" | ")[0])}
                    secondColumn={data?.data?.startgazers.detail.sort().map((item) => item.split(" | ")[1])}
                  />}
                  {data?.data?.languages && data.data.languages.length > 0 && <Table 
                    title="Favorite Language By Bytes Of Code"
                    headers={["Languages", "Bytes Of Code"]}
                    firstColumn={data?.data?.languages.sort((a, b) => b.byte_of_codes - a.byte_of_codes).map((item) => item.name)}
                    secondColumn={data?.data?.languages.sort((a, b) => b.byte_of_codes - a.byte_of_codes).map((item) => item.byte_of_codes)}
                  />}
                  <Summary 
                    title="Follows Summary"
                    detail={[
                      {
                        title: "Total Followers: ",
                        data: data?.data?.followers.total,
                      },
                      {
                        title: "Total Followings: ",
                        data: data?.data?.followings.total,
                      },
                      {
                        title: "Total Unfollowers: ",
                        data: data?.data?.unfollowers.total,
                      },
                      {
                        title: "Total Unfollowings: ",
                        data: data?.data?.unfollowings.total,
                      },
                    ]}
                  />
                  {data?.data?.followers && data.data.followers.total > 0 && <Table 
                    title="Folowers"
                    headers={["Username"]}
                    firstColumn={data?.data?.followers.detail.sort().map((item) => item)}
                  />}
                  {data?.data?.followings && data.data.followings.total > 0 && <Table 
                    title="Followings"
                    headers={["Username"]}
                    firstColumn={data?.data?.followings.detail.sort().map((item) => item)}
                  />}
                  {data?.data?.unfollowers && data.data.unfollowers.total > 0 && <Table 
                    title="Unfolowers"
                    headers={["Username"]}
                    firstColumn={data?.data?.unfollowers.detail.sort().map((item) => item)}
                  />}
                  {data?.data?.unfollowings && data.data.unfollowings.total > 0 && <Table 
                    title="Unfollowings"
                    headers={["Username"]}
                    firstColumn={data?.data?.unfollowings.detail.sort().map((item) => item)}
                  />}
                </>
              )
            }
          </section>
        )
      }
    </main>
  )
}

export default Page