
import { useContext } from 'react';
import AddComment from './components/AddComment';
import Comment from './components/Comment';
import { AppContext } from './context/AppContext';

function App() {
  const {comments} = useContext(AppContext)
  
  return (
    
    <div className="min-h-screen  p-4 bg-very_light_gray lg:p-20  lg:flex  lg:items-center lg:justify-center">
      <div className='lg:w-[700px]'>
        {
          comments.map(comment => {
            return(
              <Comment comment={comment} />
            )
          })
        }
        <AddComment />

      </div>
      
       
        
    </div>
  );
}

export default App;
