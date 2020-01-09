#!/usr/bin/env python
# coding: utf-8

# %% [markdown]
# Есть поставщики товара со складами в разных трёх городах, причём объёмы однородной продукции на этих складах соответственно равны a1, a2, a3. Есть и потребители в других трёх городах которым нужно привести товар от поставщиков в объёмах b1, b2, b3 соответственно. Известны также стоимости доставки с1÷с9 товаров от поставщиков к потребителям, согласно таблице.
#
# ![image.png](attachment:image.png)

# %%
from cvxopt.modeling import variable, op
import time
start = time.time()
x = variable(9, 'x')
z=(7*x[0] + 3*x[1] +6* x[2] +4*x[3] + 8*x[4] +2* x[5]+x[6] + 5*x[7] +9* x[8])
mass1 = (x[0] + x[1] +x[2] <= 74)
mass2 = (x[3] + x[4] +x[5] <= 40)
mass3 = (x[6] + x[7] + x[8] <= 36)
mass4 = (x[0] + x[3] + x[6] == 20)
mass5 = (x[1] +x[4] + x[7] == 45)
mass6 = (x[2] + x[5] + x[8] == 30)
x_non_negative = (x >= 0)
problem =op(z,[mass1,mass2,mass3,mass4 ,mass5,mass6, x_non_negative])
problem.solve(solver='glpk')
problem.status
print("Результат:")
print(x.value)
print("Стоимость доставки:")
print(problem.objective.value()[0])
stop = time.time()
print ("Время :")
print(stop - start)


