'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, mappedPlans } from "@/validations/userSchema";
import { object } from "zod";

function Home() {

  const {register, handleSubmit,watch, formState: { errors }} = useForm({
    resolver: zodResolver(userSchema),
  });

  const planoption=Object.entries(mappedPlans).map(([key, value])=>(
    <option value={key} key={key}>{value}</option>
  ))

  console.log(errors);
  
  return (
    <div>
      <form className="text-black" 
      onSubmit={handleSubmit((data) => {
        console.log(data);
        })}
      >

        <label htmlFor="name">Name</label>
        <input type="text" id="name" 
         {...register('name')}
         />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" 
         {...register('email')} />

        {/*PASSWORD*/}
        <label htmlFor="password">Password</label>
        <input type="password" id="password"
         {...register('password')} />

        {/*CONFIRM PASSWORD*/}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" 
         {...register('confirmPassword')}/>

        {/*weight*/}
        <label htmlFor="weight">Weight</label>
        <input type="number" id="weight" 
         {...register('weight')} />

        {/*PLAN*/}
        <label htmlFor="plan">Plan</label>
        <select id="plan" {...register('plan')}>
        <option value="">select</option>
         {planoption}
        </select>

        {/*SUBMIT*/}
        <button type="submit">Submit</button>
      </form>
     
     <div>
      {JSON.stringify(watch(), null, 2)}
     </div>
    </div>
  );
}

export default Home;
