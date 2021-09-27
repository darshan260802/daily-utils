import {IoTrashSharp} from 'react-icons/io5'

export default function TodoCard(props)
{
    
    let {todo, importance, date, num, deleteTodo} = props;

    let bg = '';
    let text = '';

    if(importance === 'low')
    {
        bg = 'bg-primary';
    }else if(importance === 'normal')
    {
        bg = 'bg-secondary';
    }
    else
    {
        bg = 'bg-accent';
    }

    if(importance === 'low')
    {
        text = 'text-primary-content';
    }else if(importance === 'normal')
    {
        text = 'text-secondary-content';
    }
    else
    {
        text = 'text-accent-content';
    }

    return(
        <div id={`task${num}`} style={{maxWidth:'95vw'}} className={`w-full relative rounded-lg break-all overflow-auto pl-2 pr-1 lg:w-96 md:w-90 sm:w-80  flex flex-col items-start justify-center ${bg} ${text} rounded-lg m-2`}>
            <h1 className="text-lg font-bold">Task: {todo}</h1>
            <span className="text-sm"> Date: {date}</span>
            <button onClick={() => deleteTodo(num)} class="btn btn-xs bg-transparent text-neutral border-0 absolute bottom-0 right-0 hover:text-neutral-content rounded-lg rounded-br-none"><IoTrashSharp/></button>
        </div>
    );
}