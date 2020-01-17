#!/usr/bin/env python3
# coding: utf-8

# %% [markdown]
# Есть поставщики товара со складами в разных трёх городах, причём объёмы однородной продукции на этих складах соответственно равны a1, a2, a3. Есть и потребители в других трёх городах которым нужно привести товар от поставщиков в объёмах b1, b2, b3 соответственно. Известны также стоимости доставки с1÷с9 товаров от поставщиков к потребителям, согласно таблице.
#
# ![image.png](attachment:image.png)

# %%
from scipy.optimize import linprog
import time
start = time.time()
c = [7, 3, 6,4,8,2,1,5,9]
A_ub = [[1,1,1,0,0,0,0,0,0],
               [0,0,0,1,1,1,0,0,0],
               [0,0,0,0,0,0,1,1,1]]
b_ub = [74,40,36]
A_eq = [[1,0,0,1,0,0,1,0,0],
               [0,1,0,0,1,0,0,1,0],
               [0,0,1,0,0,1,0,0,1]]
b_eq = [20,45,30]
print(linprog(c, A_ub, b_ub, A_eq, b_eq))
stop = time.time()
print ("Время :")
print(stop - start)
