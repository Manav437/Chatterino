import React from "react";
import { formatDate } from "../../../utils/formatDate";

const PostCard = React.memo(({ post, postUser, currentUserId, onLike }) => {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#161b22]/40 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#161b22]/60 hover:shadow-blue-500/5">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-md"></div>
                        <img
                            src={postUser?.photoURL || "/noimg-icon.png"}
                            alt="user"
                            className="relative h-14 w-14 rounded-2xl border border-white/10 object-cover shadow-lg"
                        />
                    </div>
                    <div className="flex items-start flex-col">
                        <span className="text-md font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                            {postUser?.name || "Unknown User"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {formatDate(post.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all group-hover:bg-white/10">
                        <span className="text-md font-bold text-blue-400 leading-none">
                            {post.likes ? Object.values(post.likes).filter(v => v === true).length : 0}
                        </span>
                    </div>

                    <button
                        className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-90 ${post.likes && post.likes[currentUserId]
                            ? "bg-red-500/20 text-red-500 border border-red-500/30"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                            }`}
                        onClick={() => onLike(post.postId, post.likes)}
                        title={post.likes && post.likes[currentUserId] ? "Dislike" : "Like"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={post.likes && post.likes[currentUserId] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative rounded-md bg-white/3 transition-all group-hover:bg-white/8 group-hover:border-white/8">
                <p className="text-sm text-start p-2 leading-relaxed text-gray-300 antialiased">
                    {post.content}
                </p>
                <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl rotate-12 inline-block">🧌</span>
                </div>
            </div>
        </div>
    );
});

PostCard.displayName = "PostCard";

export default PostCard;
