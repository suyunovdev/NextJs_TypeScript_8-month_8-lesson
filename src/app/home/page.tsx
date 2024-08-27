"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";

type GitHubUser = {
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string | null;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean | null;
  html_url: string;
  id: number;
  location: string | null;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
};

const fetchUserData = async () => {
  const res = await fetch("https://api.github.com/users/mirmansur");
  return res.json();
};

const fetchReposData = async (reposUrl: string) => {
  const res = await fetch(`${reposUrl}?per_page=5`);
  return res.json();
};

const HomePageContent = () => {
  const {
    isLoading: isUserLoading,
    error: userError,
    data: userData,
  } = useQuery<GitHubUser>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  const {
    isLoading: isReposLoading,
    error: reposError,
    data: reposData,
  } = useQuery<GitHubUser[]>({
    queryKey: ["reposData", userData?.repos_url],
    queryFn: () =>
      userData?.repos_url
        ? fetchReposData(userData.repos_url)
        : Promise.resolve([]),

    enabled: !!userData?.repos_url,
  });

  useEffect(() => {
    if (!isUserLoading && userData) {
      console.log("User data:", userData);
    }
    if (!isReposLoading && reposData) {
      console.log("Repositories data:", reposData);
    }
  }, [isUserLoading, userData, isReposLoading, reposData]);

  if (isUserLoading) return <p>Loading user data...</p>;
  if (userError) return <p>Error loading user data</p>;
  if (!userData) return <p>No user data available</p>;

  return (
    <div className="flex items-center justify-center flex-col w-full p-5 gap-20 ">
      <div className="flex items-center px-2 py-2 flex-col gap-5 border-2 border-gray-300 w-[700px]">
        <div className="img flex items-center justify-between px-10 w-full py-5 ">
          <div className="flex items-center justify-start flex-col gap-2">
            <Image
              src={userData.avatar_url}
              alt="User Avatar"
              width={150}
              height={150}
              className="rounded-full"
              priority={true}
            />
            <h1 className="text-xl">{userData.name}</h1>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-300 bg-cyan-600 border-none text-white font-semibold hover:bg-cyan-700 outline-none rounded-xs w-full px-3 py-2">
              Visit Github Profile
            </a>
            <h1 className="text-xl">{userData.login}</h1>
          </div>
        </div>
        <div className="flex items-center justify-center text-center w-full gap-5 mb-3">
          <h1 className="bg-green-500 text-white rounded-xl px-3 py-1.5">
            Followers: {userData.followers}
          </h1>
          <h1 className="bg-blue-500 text-white rounded-xl px-3 py-1.5">
            Following: {userData.following}
          </h1>
          <h1 className="bg-yellow-500 text-white rounded-xl px-3 py-1.5">
            Public Repos: {userData.public_repos}
          </h1>
          <h1 className="bg-red-500 text-white rounded-xl px-3 py-1.5">
            Public Gists: {userData.public_gists}
          </h1>
        </div>
        <div className="flex items-center flex-col w-full gap-2">
          {reposData && reposData.length > 0 && (
            <div className="w-full rounded-lg border-2 border-gray-300">
              <h1 className="text-xl text-center py-2">Repositories</h1>
              <ul className="list-disc pl-5">
                {reposData.map(repo => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline">
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const HomePages = (props: Props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = props.value;
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="flex items-center justify-center flex-col w-full p-5 gap-20">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-start flex-col w-full pt-10 gap-5">
        <input
          required
          value={props.value}
          onChange={props.onChange}
          type="search"
          className="border-2 border-gray-300 rounded-xs w-full px-4 py-2 cursor-pointer"
          placeholder="Search User ..."
        />
        <button className="border-2 border-gray-300 bg-cyan-600 border-none text-white font-semibold hover:bg-cyan-700 outline-none rounded-xs w-full px-3 py-2">
          Search
        </button>
      </form>
      <React.Suspense fallback={<p>Loading content...</p>}>
        <HomePageContent />
      </React.Suspense>
    </div>
  );
};

export default HomePages;
