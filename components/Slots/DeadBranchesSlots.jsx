import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";
import TimeAgo from "../TimeAgo";
import { isDeadBranch } from "../usecases/metrics";

const DEFAULT_BRANCH_NAME = "main";

export function DeadBranchesSlots({ repos, url, vercel }) {
  const { loaded, items } = useSlots({
    repos,
    loadItems: (arg) => loadBranches(arg, vercel),
  });

  const filterDead = (item) => isDeadBranch(item.date);
  const branches = items.filter(filterDead);

  if (!loaded) return <Loading />;

  if (!branches.length) return <p>No dead branches</p>;

  return (
    <ul className={styles.slots}>
      {branches.map(
        ({
          branch,
          slotUrl,
          date,
          commitMessage,
          commitUrl,
          commitAuthor,
          commitAuthorAvatar,
        }) => (
          <li className={styles.slot} key={commitUrl}>
            <a
              // href={branch === DEFAULT_BRANCH_NAME ? url : slotUrl}
              href={commitUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.slot__link}
            >
              {branch}, <TimeAgo date={date} />
            </a>
            <div className={styles.slot__info}>
              {commitAuthor && (
                <>
                  <a
                    href={`https://github.com/${commitAuthor}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={commitAuthorAvatar}
                      className={styles.slot__avatar}
                    />
                    {commitAuthor}
                  </a>
                  :
                </>
              )}{" "}
              <i>{commitMessage}</i>
            </div>
          </li>
        )
      )}
    </ul>
  );
}

async function loadBranches(repo, vercel) {
  const response = await fetch(`/api/branches?repo=${repo}&vercel=${vercel}`);

  return await response.json();
}