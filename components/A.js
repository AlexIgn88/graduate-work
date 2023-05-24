import Link from "next/link";
import styles from "../components/A.module.css";

export default function A({ text, href }) {

    return (
        <Link href={href} className={styles.link}>{text}</Link>
    )
}