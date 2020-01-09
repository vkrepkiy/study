#!/usr/bin/env python
# coding: utf-8

# %% [markdown]
# Есть поставщики товара со складами в разных трёх городах, причём объёмы однородной продукции на этих складах соответственно равны a1, a2, a3. Есть и потребители в других трёх городах которым нужно привести товар от поставщиков в объёмах b1, b2, b3 соответственно. Известны также стоимости доставки с1÷с9 товаров от поставщиков к потребителям, согласно таблице.
#
# ![image.png](attachment:image.png)

# %%
from pulp import LpMaximize, LpProblem, LpVariable, LpStatus, value, LpInteger
import time

start = time.time()
x1 = LpVariable("x1", lowBound=0)
x2 = LpVariable("x2", lowBound=0)
x3 = LpVariable("x3", lowBound=0)
x4 = LpVariable("x4", lowBound=0)
x5 = LpVariable("x5", lowBound=0)
x6 = LpVariable("x6", lowBound=0)
x7 = LpVariable("x7", lowBound=0)
x8 = LpVariable("x8", lowBound=0)
x9 = LpVariable("x9", lowBound=0)
problem = LpProblem('0',LpMaximize)
problem += -7*x1 - 3*x2 - 6* x3 - 4*x4 - 8*x5 -2* x6-1*x7- 5*x8-9* x9, "Функция цели"
problem +=x1 + x2 +x3<= 74,"1"
problem +=x4 + x5 +x6 <= 40, "2"
problem +=x7 + x8+ x9 <= 36, "3"
problem +=x1+ x4+ x7 == 20, "4"
problem +=x2+x5+ x8 == 45, "5"
problem +=x3 + x6+x9 == 30, "6"
problem.solve()
print ("Результат:")
for variable in problem.variables():
    print (variable.name, "=", variable.varValue)
print ("Стоимость доставки:")
print (abs(value(problem.objective)))
stop = time.time()
print ("Время :")
print(stop - start)

