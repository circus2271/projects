import classNames from "classnames/bind";
import styles from "./Project.module.css";
import { Pulse } from "../Pulse/Pulse";
import { Loading } from "../Loading/Loading";
import { SlotsInfo } from "../Slots/SlotsInfo";
import { Chips } from "../Chips/Chips";
import { useCallback } from "react";

const cx = classNames.bind(styles);

export default function Project({ openProject, ...project }) {
  const { title, icon, url, stats, links } = project;
  const link = new URL(url).host;
  const onClick = useCallback(() => {
    openProject(project.git);
  }, [openProject, project.git]);

  if (!stats)
    return (
      <article className={cx("project")}>
        <h2 className={cx("project__title")}>{title}</h2>
        <div className={cx("project__section")}>
          <Loading />
        </div>
      </article>
    );

  return (
    <article className={cx("project")}>
      <div className={cx("project__cover")}></div>
      <img
        className={cx("project__icon")}
        src={`/images/${icon}`}
        alt={title}
      />
      <h2 className={cx("project__title")}>
        <a href={stats.repository.html_url} target="_blank" rel="noreferrer">
          {title}
        </a>
      </h2>
      <a
        href={url}
        className={cx("project__link")}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
      <div className={cx("project__section", "project__description")}>
        {stats.repository.description}
      </div>
      <div className={cx("project__section")}>
        <Chips links={links} />
      </div>
      <div className={cx("project__section")}>
        <Pulse activity={stats?.activity} />
      </div>
      <div className={cx("project__section")} onClick={onClick}>
        <SlotsInfo project={project} repository={stats.repository} />
      </div>
    </article>
  );
}
