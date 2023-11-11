import Head from 'next/head'
import { Dashboard } from "../components/Dashboard/Dashboard";
import getAllRepoStats from "../github-api/get-all-repo-stats";

function Home({ projectsData, isWidgetVersion = false }) {
  return (
    <>
    <Head>
      <base target='_blank'></base>
    </Head>
    <Dashboard
      projectsData={projectsData}
      isWidgetVersion={isWidgetVersion}
    />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projectsData: await getAllRepoStats()
    },
//    revalidate: 3600,
    revalidate: 2,
  }
}

export default Home;
