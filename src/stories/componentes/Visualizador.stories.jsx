/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { Visualizador } from "../../componentes";

export default {
  title: "Componentes/Pasos progreso/Visualizador",
  component: Visualizador,
};

const Modelo = (args) => (
  <div className="appS">
    <Visualizador {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  fotos: [
    {
      nombre: "tarjeta-circulacion-frontal.jpg",
      url:
        // eslint-disable-next-line max-len
        "https://reportes-pruebas-marzo.s3.amazonaws.com/reportes/3115469/tarjeta-circulacion-frontal.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4ASRLSZT42UEE2ZJ%2F20210310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210310T185743Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJHMEUCIA6H%2FH5KGX4xAhzZUNKSf3FRKnPvONA01MrQWsXP62pYAiEA9Aji3QURCzvGKnSKntMmSaUIcPipyszVP%2FfFcX3SQlMq6AEIfBABGgw4MjU4NzgwOTEzNjciDHaXWY5HTE2kb%2BoxuirFAWyp4kuQ3wF0UC5%2Ff7xbe9ufwX0VOFDRiNdemwTBHQMok%2Fh0JGkx4qYtE%2BQdQPdJqqRbY05aXzrniewfCdCHxrtj4mv6rMJe4%2BXoMomRg%2Fcy8oN%2F3apEvzvgIgeah5wXKD8FhPUdottroUrMDR5gnf2dZ3XDQ%2BwLdQ4sB%2FMN527Pry5sQ8BQrifZhMPJ3tA0qVeq6WvTQagU0RUYTrz5ity3IlVlVZxfakGBbLzo6t1FSQ4B7IyiqrMaiYGQNlHRcsE6vUlZMPOspIIGOuABCpPd3%2BRINCckwyPO9xCmEQsQIsfO1tmc7aI1vomDL9FUL5m4VzxAIhTpo%2B2uSbtuaLtlAAffPq6UiYU0UAxIay%2FGGwYsute1jR1DdLKjthfFoqS6b6VhttI7KFEUDeo799W8OgpkA7r%2Fs8atTBc25wrE%2BDks3jWM%2F9gvY3ghjmpjhTtI6goRK8IXEl4eJnEaaLxgItNPKLkpGqiTEDqqlMPlRxiooLtCmNYPA2N11dEyzSBsntCSOS5WreIeFzitJKlQ8I7eTpFhv53xQarhZNQPGvZ01sHH7%2FHLsQiP3kk%3D&X-Amz-Signature=de2147abd1752256311e14d7e27446d99e69892f8f920d131e0d4813d1b387d2",
    },
    {
      nombre: "tarjeta-circulacion-trasera.jpg",
      url:
        // eslint-disable-next-line max-len
        "https://reportes-pruebas-marzo.s3.amazonaws.com/reportes/3115469/tarjeta-circulacion-trasera.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4ASRLSZT42UEE2ZJ%2F20210310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210310T185743Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJHMEUCIA6H%2FH5KGX4xAhzZUNKSf3FRKnPvONA01MrQWsXP62pYAiEA9Aji3QURCzvGKnSKntMmSaUIcPipyszVP%2FfFcX3SQlMq6AEIfBABGgw4MjU4NzgwOTEzNjciDHaXWY5HTE2kb%2BoxuirFAWyp4kuQ3wF0UC5%2Ff7xbe9ufwX0VOFDRiNdemwTBHQMok%2Fh0JGkx4qYtE%2BQdQPdJqqRbY05aXzrniewfCdCHxrtj4mv6rMJe4%2BXoMomRg%2Fcy8oN%2F3apEvzvgIgeah5wXKD8FhPUdottroUrMDR5gnf2dZ3XDQ%2BwLdQ4sB%2FMN527Pry5sQ8BQrifZhMPJ3tA0qVeq6WvTQagU0RUYTrz5ity3IlVlVZxfakGBbLzo6t1FSQ4B7IyiqrMaiYGQNlHRcsE6vUlZMPOspIIGOuABCpPd3%2BRINCckwyPO9xCmEQsQIsfO1tmc7aI1vomDL9FUL5m4VzxAIhTpo%2B2uSbtuaLtlAAffPq6UiYU0UAxIay%2FGGwYsute1jR1DdLKjthfFoqS6b6VhttI7KFEUDeo799W8OgpkA7r%2Fs8atTBc25wrE%2BDks3jWM%2F9gvY3ghjmpjhTtI6goRK8IXEl4eJnEaaLxgItNPKLkpGqiTEDqqlMPlRxiooLtCmNYPA2N11dEyzSBsntCSOS5WreIeFzitJKlQ8I7eTpFhv53xQarhZNQPGvZ01sHH7%2FHLsQiP3kk%3D&X-Amz-Signature=43a67d91f85dae303beaaf0607a2a409c9200a0db6165c23521f9d27b37a3fed",
    },
    {
      nombre: "trasera-derecha.jpg",
      url:
        // eslint-disable-next-line max-len
        "https://reportes-pruebas-marzo.s3.amazonaws.com/reportes/3115469/trasera-derecha.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4ASRLSZT42UEE2ZJ%2F20210310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210310T185743Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJHMEUCIA6H%2FH5KGX4xAhzZUNKSf3FRKnPvONA01MrQWsXP62pYAiEA9Aji3QURCzvGKnSKntMmSaUIcPipyszVP%2FfFcX3SQlMq6AEIfBABGgw4MjU4NzgwOTEzNjciDHaXWY5HTE2kb%2BoxuirFAWyp4kuQ3wF0UC5%2Ff7xbe9ufwX0VOFDRiNdemwTBHQMok%2Fh0JGkx4qYtE%2BQdQPdJqqRbY05aXzrniewfCdCHxrtj4mv6rMJe4%2BXoMomRg%2Fcy8oN%2F3apEvzvgIgeah5wXKD8FhPUdottroUrMDR5gnf2dZ3XDQ%2BwLdQ4sB%2FMN527Pry5sQ8BQrifZhMPJ3tA0qVeq6WvTQagU0RUYTrz5ity3IlVlVZxfakGBbLzo6t1FSQ4B7IyiqrMaiYGQNlHRcsE6vUlZMPOspIIGOuABCpPd3%2BRINCckwyPO9xCmEQsQIsfO1tmc7aI1vomDL9FUL5m4VzxAIhTpo%2B2uSbtuaLtlAAffPq6UiYU0UAxIay%2FGGwYsute1jR1DdLKjthfFoqS6b6VhttI7KFEUDeo799W8OgpkA7r%2Fs8atTBc25wrE%2BDks3jWM%2F9gvY3ghjmpjhTtI6goRK8IXEl4eJnEaaLxgItNPKLkpGqiTEDqqlMPlRxiooLtCmNYPA2N11dEyzSBsntCSOS5WreIeFzitJKlQ8I7eTpFhv53xQarhZNQPGvZ01sHH7%2FHLsQiP3kk%3D&X-Amz-Signature=b987ac98ffdc1439748efd7a1dcda9a997f460605a3f5887556e67bc06d7cc27",
    },
    {
      nombre: "trasera-izquierda.jpg",
      url:
        // eslint-disable-next-line max-len
        "https://reportes-pruebas-marzo.s3.amazonaws.com/reportes/3115469/trasera-izquierda.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4ASRLSZT42UEE2ZJ%2F20210310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210310T185743Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJHMEUCIA6H%2FH5KGX4xAhzZUNKSf3FRKnPvONA01MrQWsXP62pYAiEA9Aji3QURCzvGKnSKntMmSaUIcPipyszVP%2FfFcX3SQlMq6AEIfBABGgw4MjU4NzgwOTEzNjciDHaXWY5HTE2kb%2BoxuirFAWyp4kuQ3wF0UC5%2Ff7xbe9ufwX0VOFDRiNdemwTBHQMok%2Fh0JGkx4qYtE%2BQdQPdJqqRbY05aXzrniewfCdCHxrtj4mv6rMJe4%2BXoMomRg%2Fcy8oN%2F3apEvzvgIgeah5wXKD8FhPUdottroUrMDR5gnf2dZ3XDQ%2BwLdQ4sB%2FMN527Pry5sQ8BQrifZhMPJ3tA0qVeq6WvTQagU0RUYTrz5ity3IlVlVZxfakGBbLzo6t1FSQ4B7IyiqrMaiYGQNlHRcsE6vUlZMPOspIIGOuABCpPd3%2BRINCckwyPO9xCmEQsQIsfO1tmc7aI1vomDL9FUL5m4VzxAIhTpo%2B2uSbtuaLtlAAffPq6UiYU0UAxIay%2FGGwYsute1jR1DdLKjthfFoqS6b6VhttI7KFEUDeo799W8OgpkA7r%2Fs8atTBc25wrE%2BDks3jWM%2F9gvY3ghjmpjhTtI6goRK8IXEl4eJnEaaLxgItNPKLkpGqiTEDqqlMPlRxiooLtCmNYPA2N11dEyzSBsntCSOS5WreIeFzitJKlQ8I7eTpFhv53xQarhZNQPGvZ01sHH7%2FHLsQiP3kk%3D&X-Amz-Signature=edeee0854c63beaf6e6c4f58c0996f945207b4a0d79019a8d1420f8cf86733f6",
    },
  ],
};
