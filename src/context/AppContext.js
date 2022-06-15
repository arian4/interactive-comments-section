import React,{useState} from "react";
import JsonData from '../data/data.json'
export const AppContext = React.createContext()

export function AppContextProvider({children}){
    const [comments,SetComments] = useState(JsonData.comments)
    const [currentUser, SetCurrentUser] = useState(JsonData.currentUser)
    

    const AddNewComment = (comment_text) => {

        SetComments([...comments , {
            id : Date.now(),
            content : comment_text,
            createdAt :'Just Now',
            score : 0,
            user : currentUser,
            replies : []
        }])

    }

    const AddReplyComment = (replyingTo , reply_text ) =>{
        let [selected_comment] = comments.filter(c => c.user.username === replyingTo.user.username || c.replies.includes(replyingTo))
        let comment_index = comments.indexOf(selected_comment)
        SetComments(
            [
                ...comments.slice(0,comment_index) , 
                {...selected_comment , replies : [...selected_comment.replies , {
                    id : Date.now(),
                    content : reply_text,
                    createdAt : 'Just Now',
                    score : 0,
                    replyingTo : replyingTo.user.username,
                    user : currentUser

                }]},
                ...comments.slice(comment_index + 1)
            ]
        )
        
        
    }

    const DeleteComment = (comment) => {
        let [deleted_comment] = comments.filter(c => c.user.username === comment.user.username)
        let [deleted_reply_parent] = comments.filter(c =>  c.replies.includes(comment))
        if(deleted_comment){
            SetComments(comments.filter(c => c.user.username !== comment.user.username))
        }

        if(deleted_reply_parent){
            
            let reply_index = comments.indexOf(deleted_reply_parent)
            
            SetComments(
                [
                    ...comments.slice(0,reply_index) ,
                    {
                        ...deleted_reply_parent , replies : deleted_reply_parent.replies.filter(r => r !== comment)
                    },
                    ...comments.slice(reply_index + 1)

                ]
            )

        }


    }
    

    
    

    
    
    
    
    
    return(
        <AppContext.Provider 
        value={{
            comments,
            SetComments,
            currentUser,
            SetCurrentUser,
            AddNewComment,
            AddReplyComment,
            DeleteComment
            


            
            }}
        >
            {children}
        </AppContext.Provider>
    )
}