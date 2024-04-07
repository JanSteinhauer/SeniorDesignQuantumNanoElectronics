# geometry.jl

This module provides functions for determining the material type based on position coordinates.

## Tutorial

### An example - Material Determination

To determine the material type based on position coordinates, follow these steps:

1. Define the position coordinates using a `Vector{Float64}`.
   ```julia
   R = [x, y, z]
2. Call the `geometry` function to determine the material type.
    ```julia
    material_type = geometry(R)
    ```
    The `geometry` function returns a string indicating the material type ("insulator" or "GaAs").
## Constants
`geometry_params`: Named tuple containing parameters for defining the geometry of the device.
        - `A`: Matrix of unit cell lattice vectors.
        - `nx`: Number of times to tile the cell over space in the x-direction.
        -`ny`: Number of times to tile the cell over space in the y-direction.
        - `nz`: Number of times to tile the cell over space in the z-direction.
        - `prun`: List of dimensions to prune.

module geometry
import using `FANCY_TRANSPORT_PACKAGE`
export `geometry`, `geometry_params`

## Arguments:
-	`R::Vector{Float64}` : Position coordinates (x, y, z) in meters.

## Returns:
-	`String`: Material type ("insulator" or "GaAs").

    ```julia
    function geometry(R::Vector{Float64})
        x = R[1]; y = R[2]; z = R[3];
        if (x < 10*nm || x > 50*nm)
            return "insulator"
        else
            return "GaAs"
        end
    end
    
    geometry_params = (
        A = 2.866 * nm * I(3),   # Matrix of unit cell lattice vectors
        nx = 50,                 # Number of times to tile the cell over space in the x-direction
        ny = 5,                  # Number of times to tile the cell over space in the y-direction
        nz = 1,                  # Number of times to tile the cell over space in the z-direction
        prune = ["x", "y", "z"], # List of dimensions to prune
    )
    
    end  # module
    ```

# runs.jl
This module contains parameters for configuring different types of simulations.

## Tutorial
### An example: Running Simulations
To run simulations with different configurations, follow these steps:
1. Define the directory path where simulation data will be stored.
        ```julia
        path = "./"
            ```
    
2. Configure parameters for simulations focusing on the electronic properties of a single unit cell.
    ```julia
    unitcell = (
        bands = true,
        bands_project = [σ[1], γ⁵],
        poisson = false,
        DOS = false
    )
    ```
    - `bands`: Boolean indicating whether to compute electronic band structure.
    - `bands_project`: List of projection operators for computing bands.
    - `poisson`: Boolean indicating whether to include Poisson solver.
    - `DOS`: Boolean indicating whether to compute density of states.
    

3. Configure parameters for simulations focusing on voltage-dependent transport properties.
    ```julia
    transport = (
        ΔV = 0.05,
        μ = 0.1 * eV,
        T = 300,
        η = 1E-4 * eV,
        savedensities = true,
        density_project = [I(2), [σ[1], σ[2], σ[3]]],
        Gʳinv_method = "CBR",
        D_dephasing = 0.1 * eV,
        D_spin = 0.01 * eV,
        D_momentum = 0.5 * eV,
        kspace = false
    )
    ```
    - `ΔV`: Voltage bias.
    - `μ`: Chemical potential.
    - `T`: Temperature.
    - `η`: Broadening parameter for densities.
    - `savedensities`: Boolean indicating whether to save density matrices.
    - `density_project`: List of projection operators for density matrices.
    - `Gʳinv_method`: Method for computing Green's function inverse.
    - `D_dephasing`: Dephasing parameter.
    - `D_spin`: Spin relaxation parameter.
    - `D_momentum`: Momentum relaxation parameter.
    - `kspace`: Boolean indicating whether to use k-space.
    

4. Configure parameters for simulations using multiple unit cells.
    ```julia
    supercell = (
        bands = true,
        bands_project = [σ[1], σ[2]],
        poisson = true,
        μ = 0.1 * eV,
        T = 300,
        η = 1E-4 * eV,
        savedensities = true,
        density_project = [I(2), [σ[1], σ[2], σ[3]]],
        Gʳinv_method = "CBR",
        D_dephasing = 0.1 * eV,
        D_spin = 0.01 * eV,
        D_momentum = 0.5 * eV
    )
    ```
    (Same parameters as unitcell and transport)

5. Create a named tuple `runparams` containing the configured parameters.
    ```julia
    runparams = (path = path, unitcell = unitcell, transport = transport, supercell = supercell)
    ```

6. Use the `run_simulation` function with the `runparams` tuple to execute the simulation.
    `run_simulation(runparams)`
    
## Constants
- `path`: Path to the directory where simulation data will be stored.

# materials.jl
This module contains functions for computing hopping terms and other material-specific properties.
1. Define the parameters for the material using a named tuple p.
    `p`: Named tuple containing material parameters.

2. Create an empty vector NNs to store the hopping terms.
    `NNs = Vector{Hopping}()`

3. Call the `metalHopping` function with the parameters `p`, `NNs`, and the initial lattice site indices `ia`.
    `metalHopping(p, NNs, ia)`:
    - `p`: Named tuple containing material parameters.
    - `NNs`: Vector of Hopping objects representing nearest neighbor hoppings.
    - `ia`: Vector representing the indices of the initial lattice site.



