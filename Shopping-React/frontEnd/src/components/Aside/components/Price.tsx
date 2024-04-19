import Input from "../../Input";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { searchProductsByPrice } from "../../../api/productApi";

type FormData = {
  price_min: string;
  price_max: string;
};
interface PriceProps {
  onPriceChange: (products: any[]) => void;
}

export default function Price({ onPriceChange }: PriceProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const watchMinPrice = watch("price_min");
  const onSubmit = async (data: { price_min: any; price_max: any }) => {
    const { price_min, price_max } = data;
    const products_price = await searchProductsByPrice(price_min, price_max);
    onPriceChange(products_price);
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div>{t("aside.price")}</div>
      <div className="mb-2 flex items-start">
        <div>
          <div className="false py-1 default-input">
            <Input
              type="text"
              placeholder={t("aside.price_min")}
              {...register("price_min", {
                required: "Minimum price is required",
                valueAsNumber: true,
                min: { value: 0, message: "The price cannot be negative" },
              })}
            />
            {errors.price_min && <p>{errors.price_min.message}</p>}
          </div>
        </div>
        <div className="mx-2 mt-2 shrink-0">-</div>
        <div>
          <div className="false py-1 default-input">
            <Input
              type="text"
              placeholder={t("aside.price_max")}
              {...register("price_max", {
                required: "Maximum price is required",
                valueAsNumber: true,
                min: {
                  value: watchMinPrice,
                  message:
                    "The maximum price cannot be lower than the minimum price",
                },
                validate: (value) =>
                  Number(value) > 0 || "The price cannot be negative",
              })}
            />
            {errors.price_max && <p>{errors.price_max.message}</p>}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="outline-none bg-orange transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80"
      >
        {t("aside.apply")}
      </button>
    </form>
  );
}
