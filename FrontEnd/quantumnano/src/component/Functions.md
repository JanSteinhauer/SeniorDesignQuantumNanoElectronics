# Functions
### Metal Hopping
This function calculates the hopping terms for metallic materials within a lattice structure and adds them to a vector of Hopping objects.
#### Tutorial
To compute hopping terms for metallic materials within a lattice structure, follow these steps:

Iterate over neighboring lattice sites to compute hopping energies.
>    - Compute the orbital index `iorb` from the initial lattice site indices `ia`.
>    - Compute the hopping energy `t`.
>    - Add the hopping term corresponding to the on-site energy between the initial lattice site `ia` and itself to the vector `NNs`.
>    - Iterate over all three spatial dimensions and both positive and negative directions.
>    - Compute the shift vector `di` to determine neighboring lattice sites.
>    - Compute the hopping energy `t` and add the hopping term between the initial lattice site `ia` and the neighboring lattice site `ib` to the vector `NNs`.

#### Function
```julia
metalHopping(p::NamedTuple, NNs::Vector{Hopping}, ia::Vector{Int}): 
Computes hopping terms for metallic materials within a lattice structure.
```

### insHopping
This function calculates the hopping terms for insulating materials within a lattice structure and adds them to a vector of Hopping objects.
#### Tutorial
To compute hopping terms for insulating materials within a lattice structure, follow these steps:
1. Define the parameters for the material using a named tuple.
    `p`: Named tuple containing material parameters.

2. Create an empty vector `NNs` to store the hopping terms.
    ```julia 
    NNs = Vector{Hopping}()
    ```

3. Call the `insHopping` function with the parameters `p`, `NNs`, and the initial lattice site indices `ia`.
    ```julia    
    `insHopping(p, NNs, ia)`
    ```

4. Iterate over neighboring lattice sites to compute hopping energies.

    - Compute the orbital index `iorb` from the initial lattice site indices `ia`.
    - Compute the hopping energy `t` using the parameters `p.ϵ₁` and `p.t`.
    - Add the hopping term corresponding to the on-site energy between the initial lattice site `ia` and itself to the vector `NNs`.
    - Iterate over all three spatial dimensions and both positive and negative directions.
    - Compute the shift vector `di` to determine neighboring lattice sites.
    - Compute the hopping energy `t` and add the hopping term between the initial lattice site `ia` and the neighboring lattice site `ib` to the vector `NNs`.
    
    

### pushHopping
Appends a hopping term to a vector of hopping terms (NNs)
#### Tutorial
1.	Convert the initial and final lattice site indices (`ia` and `ib`) to their corresponding orbital indices (`a` and `b`) using the function `xyztoi`.
2.	Convert the initial and final lattice site indices (`ia` and `ib`) to their corresponding real-space coordinates (`ra` and `rb`) using the function `xyztor`.
3.	Calculate the displacement vector `r` between the initial and final sites by subtracting their real-space coordinates (`rb` - `ra`).
4.	Create a new Hopping object containing the hopping information:
    a.	Orbital indices (`a` and `b`).
    b.	Initial and final lattice site indices (`ia` and `ib`).
    c.	Real-space coordinates (`ra` and `rb`).
    d.	Displacement vector (`r`).
    e.	Hopping energy (`t`).
    f.	Flag indicating whether the hopping term is onsite (`false`).
    g.	Spin vector (set to zero vector).
    h.	An empty string.
    
5.	Append the newly created Hopping object to the vector `NNs` using the `push!` function.


### weyl3Hopping
Calculates hopping terms for a 3D material with Weyl points in its band structure, considering nearest, next-nearest, and next-to-next-nearest neighbors.
#### Tutorial

1.	Define initial orbital and lattice site indices:
	Extract the orbital index `iorb` from the fifth element of the initial lattice site indices vector `ia`.
2.	Nearest neighbors:
    a.	Iterate over all three spatial dimensions `ax` and both positive and negative directions `dir`.
    b.	Create a displacement vector `di` with zero elements except for the chosen axis `ax`, which is set to the direction `dir`.
    c.	Calculate the final lattice site indices `ib` by adding the displacement vector `di` to the initial lattice site indices `ia`.
    d.	Construct a complex hopping tensor `t` of size 2x2, initialized with zeros.
    e.	Based on the chosen axis, assign values to the `t` tensor using the Pauli matrices 
    (σ[1], σ[2], and σ[3]) and material parameters:
    ```julia
    ax = 3: t = p.t * σ[3]
    ax = 1: t = p.t * (-σ[3] + dir * 2im * σ[1])
    ax = 2: t = p.t * (-σ[3] + dir * 2im * σ[2])
    ```
    f.	Append the newly created hopping term with initial and final site indices (`ia` and `ib`), hopping tensor `t`, and material parameters `p` using `pushHopping!` to the vector `NNs`.

3.	Next-nearest neighbors:
    a.	Iterate over all combinations of positive and negative displacements in the first two spatial dimensions `dx` and `dy`.
    b.	Create a displacement vector di with zeros except for the first two elements 
`di[1] = dx and di[2] = dy`.
    c.	Calculate the final lattice site indices `ib` by adding the displacement vector `di` to the initial lattice site indices `ia`.
    d.	Construct a complex hopping tensor `t` with size 2x2 and assign the value: 
    ```julia
    t = 1.5im * p.t * (-dx * σ[1] + -dy * σ[2])
    ```
    This implements the next-nearest neighbor term.
    e.	Append the hopping term using `pushHopping!` to the vector `NNs`.


4.	Next-to-next-nearest neighbors:
    a.	Iterate over the first two spatial dimensions `ax`.
    b.	Iterate over both positive and negative directions `dir`.
    c.	Create a displacement vector `di` with zeros except for the chosen axis `ax`, which is set to twice the direction.
    d.	Calculate the final lattice site indices `ib` by adding the displacement vector `di` to the initial lattice site indices `ia`.
    e.	Construct a complex hopping tensor `t` with size 2x2 and assign the value: 
    ```julia
    t = dir * p.t * 0.5im * σ[ax]
    ```
    f.	Append the hopping term using `pushHopping!` to the vector `NNs`.


### weyl2Hopping
Calculates hopping terms for a 2D material with Weyl points in its band structure, considering nearest and next-nearest neighbors.
#### Tutorial

1.	Define initial orbital and lattice site indices:
    a.	Extract the orbital index `iorb` from the fifth element of the initial lattice site indices vector `ia`.
2.	Nearest neighbors:
    a.	Iterate over all three spatial dimensions `ax`, and both positive and negative directions `dir`.
    b.	Create a displacement vector `di` with zero elements except for the chosen axis `ax`, which is set to the direction `dir`.
    c.	Calculate the final lattice site indices `ib` by adding the displacement vector `di` to the initial lattice site indices `ia`.
    d.	Construct a complex hopping tensor `t` of size 2x2, initialized with zeros.
    e.	Based on the chosen axis, assign values to the `t` tensor using the Pauli matrices (σ[1], σ[2], and σ[3]) and material parameters:
    ```julia
    ax = 1: t = p.t * (σ[1] - σ[3])
    ax = 2: t = -p.t * (σ[1] + σ[3])
    ax = 3: t = p.t * σ[3]
    ```
    f.	Append the newly created hopping term with initial and final site indices, hopping tensor, and material parameters using `pushHopping!` to the vector `NNs`.
    
3.	Next-nearest neighbors:
a.	Iterate over all combinations of positive and negative displacements in the first two spatial dimensions `dx` and `dy`.
b.	Create a displacement vector `di` with zeros except for the first two elements 
`di[1] = dx and di[2] = dy`.
c.	Calculate the final lattice site indices `ib` by adding the displacement vector `di` to the initial lattice site indices `ia`.
d.	Construct a complex hopping tensor `t` with size 2x2 and assign the value: 
    ```julia
    t = -dx * dy * 0.5 * p.t * σ[2]
    ```
    This implements the next-nearest neighbor term.
    
    e.	Append the hopping term using `pushHopping!` to the vector `NNs`.


### chern2DHopping
Calculates hopping terms for a 2D material with Chern points, considering on-site energy, nearest-neighbor coupling mediated by spin-orbit interaction, and normal hopping between nearest neighbor orbitals.
#### Tutorial
1.	On-site term:
a.	Extract the orbital index iorb from `ia[5]`.
b.	Calculate the hopping energy `t` for the on-site term: 
    ```julia
    t = nextsite(iorb) * (2 * p.m2 + p.γ) * I(2)
    ```
    - `nextsite(iorb)`: This function is assumed to return the orbital index of the nearest neighbor based on the current orbital `iorb`. 
    - `i(2)`: Identity matrix of size 2x2, representing no change in orbital state.
    
    c.	Append a new Hopping object to `NNs` with:
    - Initial and final site indices: `ia` (both initial and final sites are the same for on-site term).
    - Hopping energy: `t`.
    - Material parameters: `p`.
2.	Nearest-neighbor term:
    a.	Iterate over all three spatial dimensions `ax` and both positive and negative directions `dir`.
    b.	Create a displacement vector `di` with zeros except for the chosen axis `ax`, which is set to the direction `dir`.
    c.	Set the fifth element of `di` to `nextsite(iorb)`, indicating the nearest neighbor orbital index shift.
    d.	Calculate the final lattice site indices `i`b by adding the displacement vector `di` to the initial lattice site indices `ia`.
    e.	Construct the hopping energy t for the nearest-neighbor term: 
    ```julia
    t = (im/2) * dir * p.t * σ[ax].
    ```
    - `im`: Imaginary unit.
    - `dir`: Direction (+1 or -1).
    - `p.t`: Material parameter (hopping strength).
    - `σ[ax]`: Pauli matrix corresponding to the chosen axis (ax). This term represents the spin-orbit interaction mediated nearest-neighbor coupling.
    
    f.	Append a new Hopping object to `NNs` with:
    •	Initial and final site indices.
    •	Hopping energy: `t`.
    •	Material parameters: `p`.
    
3.	Normal hopping term:
    a.	Modify the fifth element of `ib` back to the original orbital index `iorb` (hopping between orbitals on the same site).
    b.	Calculate the hopping energy `t` for the normal hopping term: 
    ```julia
    t = - (1/2) * nextsite(iorb) * p.m2 * I(2).
    ```
    - This term represents the direct hopping between nearest neighbor orbitals and contributes to the overall band structure.
    
    c.	Append a new Hopping object to `NNs` with:
    •	Initial and final site indices.
    •	Hopping energy: `t`.
    •	Material parameters: `p`.




