import {ReactQueryProvider} from "@/app/hooks/useReactQuery"
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import Posts from './posts';

const BlogPage = () => {
    return (
        <div className={styles.container}>
          <ReactQueryProvider>
            <Posts/>
          </ReactQueryProvider>
        </div>
    );
}

export default BlogPage;

