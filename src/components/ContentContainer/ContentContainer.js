import s from './ContentContainer.module.css';

export default function ContentContainer({ children }) {
  return <div className={s.container}>{children}</div>;
}
