"use client"

import { useEffect, useState } from "react"
import { FaIdBadge, FaKey } from "react-icons/fa6"
import { GenerateData, GetData } from "../../../wailsjs/go/main/App"
import { dto, models } from "../../../wailsjs/go/models"


const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [personalAccessToken, setPersonalAccessToken] = useState("")
  const [dataId, setDataId] = useState("")
  const [data, setData] = useState<models.GWAResult | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (dataId && dataId !== "") {
        try {
          setIsLoading(true)
  
          const result = await GetData(dataId)
          if (result) {
            setData(result)
          }
  
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching data:", error)
          setData(null)
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [dataId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const requestData = new dto.Request({
        personal_access_token: personalAccessToken,
        start_date: startDate,
        end_date: endDate,
        data_id: dataId
      })
      const result = await GenerateData(requestData)
      if (result) {
        setDataId(result.id.toString())
      }
        
      setIsLoading(false)
    } catch(error) {
      console.error("Error generate data:", error)
      
      setIsLoading(false)
    }
  }
  
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
          <button type="submit" className="btn btn-primary font-bold text-lg hover:text-base-100" disabled={isLoading}>
            {isLoading ? "Start Analyzing....." : "Start Analyzing"}
          </button>
        </section>
      </form>
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
                  <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                    <h3 className="font-bold text-2xl !mb-5">Repository Summary</h3>
                    <div className="flex flex-wrap justify-between w-full gap-3">
                      <p className="w-5/12 font-medium">Total Repositories: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.total}</span></p>
                      <p className="w-5/12 font-medium">Total Commits: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.total_commits}</span></p>
                      <p className="w-5/12 font-medium">Total Repositories Owned: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_owned.total}</span></p>
                      <p className="w-5/12 font-medium">Total Commits On Repositories Owned: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_owned.total_commits}</span></p>
                      <p className="w-5/12 font-medium">Total Repositories Contributed: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_contributed.total}</span></p>
                      <p className="w-5/12 font-medium">Total Commits On Repositories Contributed: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_contributed.total_commits}</span></p>
                      <p className="w-5/12 font-medium">Total Repositories Forked: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_forked.total}</span></p>
                      <p className="w-5/12 font-medium">Total Commits On Repositories Forked: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.repositories.repository_forked.total_commits}</span></p>
                    </div>
                  </div>
                  {data?.data?.repositories.repository_owned && data.data.repositories.repository_owned.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Repository Owned</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Repository Name</th>
                              <th>Total Commits</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.repositories.repository_owned.detail.sort((a, b) => b.total_commits - a.total_commits).map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item.name}</td>
                                <td>{item.total_commits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.repositories.repository_contributed && data.data.repositories.repository_contributed.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Repository Contributed</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Repository Name</th>
                              <th>Total Commits</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.repositories.repository_contributed.detail.sort((a, b) => b.total_commits - a.total_commits).map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item.name}</td>
                                <td>{item.total_commits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.repositories.repository_forked && data.data.repositories.repository_forked.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Repository Forked</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Repository Name</th>
                              <th>Total Commits</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.repositories.repository_forked.detail.sort((a, b) => b.total_commits - a.total_commits).map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item.name}</td>
                                <td>{item.total_commits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                    <h3 className="font-bold text-2xl !mb-5">Star Summary</h3>
                    <div className="flex flex-wrap justify-between w-full gap-3">
                      <p className="w-5/12 font-medium">Total Starred Repositories: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.starreds.total}</span></p>
                      <p className="w-5/12 font-medium">Total Stargazers: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.startgazers.total}</span></p>
                    </div>
                  </div>
                  {data?.data?.starreds.detail && data.data.starreds.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Starred Repositories</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Repository Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.starreds.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.startgazers.detail && data.data.startgazers.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Stargazers</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Repository Name</th>
                              <th>Star Giver</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.startgazers.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item.split(" | ")[0]}</td>
                                <td>{item.split(" | ")[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.languages && data.data.languages.length > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Favorite Language By Bytes Of Code</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Languages</th>
                              <th>Bytes Of Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.languages.sort((a, b) => b.byte_of_codes - a.byte_of_codes).map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item.name}</td>
                                <td>{item.byte_of_codes} KB</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                    <h3 className="font-bold text-2xl !mb-5">Follows Summary</h3>
                    <div className="flex flex-wrap justify-between w-full gap-3">
                      <p className="w-5/12 font-medium">Total Followers: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.followers.total}</span></p>
                      <p className="w-5/12 font-medium">Total Followings: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.followings.total}</span></p>
                      <p className="w-5/12 font-medium">Total Unfollowers: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.unfollowers.total}</span></p>
                      <p className="w-5/12 font-medium">Total Unfollowings: <span className="font-semibold bg-primary text-base-100 py-1 px-2 rounded">{data?.data?.unfollowings.total}</span></p>
                    </div>
                  </div>
                  {data?.data?.followers && data.data.followers.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Folowers</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.followers.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.followings && data.data.followings.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Followings</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.followings.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.unfollowers && data.data.unfollowers.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Unfolowers</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.unfollowers.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {data?.data?.unfollowings && data.data.unfollowings.total > 0 && (
                    <div className="w-11/12 md:w-10/12 border-b border-bottom border-primary pb-6">
                      <h3 className="font-bold text-2xl !mb-5">Unfollowings</h3>
                      <div className="overflow-x-auto max-h-80">
                        <table className="table table-xs table-pin-rows">
                          <thead>
                            <tr className="bg-base-200 text-base-300">
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.data?.unfollowings.detail.sort().map((item, index) => (
                              <tr key={index} className="hover">
                                <td>{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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