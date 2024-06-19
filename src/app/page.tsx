"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedPlans } from "@/validations/userSchema";
import { object } from "zod";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  cumple: string;
  plan: string;
};

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const planoption = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ));

  console.log(errors);

  return (
    <div>
      <form
        className="text-black"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name?.message && <p className="text-white">{errors.name?.message}</p>}

        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email")} />
        {errors.email?.message && <p className="text-white">{errors.email?.message}</p>}

        {/*PASSWORD*/}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password?.message && <p className="text-white">{errors.password?.message}</p>}
        {/*CONFIRM PASSWORD*/}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p className="text-white">{errors.confirmPassword?.message}</p>
        )}
        {/*CUMPLEAÑOS*/}
        <label htmlFor="cumple" > Cumpleaños</label>
        <input type="date" id="cumple" {...register("cumple")} />
        {errors.cumple?.message && <p>{errors.cumple?.message}</p>}

        {/*weight*/}
        <label htmlFor="weight">Weight</label>
        <input type="number" id="weight" {...register("weight")} />
        {errors.weight?.message && <p className="text-white">{errors.weight?.message}</p>}

        {/*PLAN*/}
        <label htmlFor="plan">Plan</label>
        <select id="plan" {...register("plan")}>
          <option value="">select</option>
          {planoption}
        </select>
        {errors.plan?.message && <p className="text-white">{errors.plan?.message}</p>}

        {/*SUBMIT*/}
        <button type="submit">Submit</button>
      </form>

      <div>{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
}

export default Home;
