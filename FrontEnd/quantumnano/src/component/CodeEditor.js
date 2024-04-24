import React, { useState, useEffect } from 'react';
import Button from '../component/StyledButton';

const CodeEditor = ({ updateVariable, typeVar1_mat, typeVar2_mat, typeVar3_mat, typeVar4_mat, typeVar5_mat, typeVar6_mat, typeVar7_mat,
                      typeVar1_geo, typeVar2_geo, typeVar3_geo, typeVar4_geo, typeVar5_geo, typeVar6_geo, typeVar7_geo, 
                      typeVar1_run, typeVar2_run, typeVar3_run, typeVar4_run, typeVar5_run, typeVar6_run, typeVar7_run,
                      typeVar8_run, typeVar9_run, typeVar10_run, typeVar11_run, typeVar12_run, typeVar13_run, typeVar14_run,
                      typeVar15_run}) => {
  const initialCode = `
@cfunction(callable, ReturnType, (ArgumentTypes...,)) -> Ptr{Cvoid}
@cfunction($callable, ReturnType, (ArgumentTypes...,)) -> CFunction
julia> A = zeros(5, 5);
julia> B = [1 2; 3 4];

# Function for material parameters
function material_parameters(
        mat_param1::${typeVar1_mat}, 
        mat_param2::${typeVar2_mat}, 
        mat_param3::${typeVar3_mat}, 
        mat_param4::${typeVar4_mat}, 
        mat_param5::${typeVar5_mat}, 
        mat_param6::${typeVar6_mat},
        mat_param7::${typeVar7_mat})
    return (mat_param1, mat_param2, mat_param3, mat_param4, mat_param5, mat_param6, mat_param7)
end

function geometry_parameters(
        geo_param1::${typeVar1_geo}, 
        geo_param2::${typeVar2_geo}, 
        geo_param3::${typeVar3_geo}, 
        geo_param4::${typeVar4_geo}, 
        geo_param5::${typeVar5_geo}, 
        geo_param6::${typeVar6_geo},
        geo_param7::${typeVar7_geo})
    return (geo_param1, geo_param2, geo_param3, geo_param4, geo_param5, geo_param6, geo_param7)
end

function run_parameters(
        run_param1::${typeVar1_run}, 
        run_param2::${typeVar2_run}, 
        run_param3::${typeVar3_run},
        run_param4::${typeVar4_run}, 
        run_param5::${typeVar5_run}, 
        run_param6::${typeVar6_run},
        run_param7::${typeVar7_run},
        run_param8::${typeVar8_run},
        run_param9::${typeVar9_run},
        run_param10::${typeVar10_run},
        run_param11::${typeVar11_run},
        run_param12::${typeVar12_run},
        run_param13::${typeVar13_run},
        run_param14::${typeVar14_run},
        run_param15::${typeVar15_run})
    return (run_param1, run_param2, run_param3, run_param4, run_param5, run_param6, run_param7, run_param8, run_param9, run_param10, run_param11, run_param12, run_param13, run_param14, run_param15)
end

# ... (rest of the code can be added here using their respective typeVars)
  `;

  const [code, setCode] = useState(initialCode);
  const [lines, setLines] = useState(computeLines(initialCode));

  const [materialjl1, setMaterialjl1] = useState('');

    // Function to handle changes in the textarea
    const handleCodeChange1 = (event) => {
        setMaterialjl1(event.target.value);
    };

    const [geo1, setGeo1] = useState('');

    // Function to handle changes in the textarea
    const handleCodeChange2 = (event) => {
      setGeo1(event.target.value);
    };

    const [run1, setRun1] = useState('');

    // Function to handle changes in the textarea
    const handleCodeChange3 = (event) => {
        setRun1(event.target.value);
    };


  function computeLines(text) {
    return text.split('\n').length;
  }
  const exportToJuliaFileMat = () => {
    const blob = new Blob([materialjl1], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'material.jl'; // Naming the download file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  }
  const exportToJuliaFileGeo = () => {
    const blob = new Blob([geo1], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'geo.jl'; // Naming the download file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  }
  const exportToJuliaFileRun = () => {
    const blob = new Blob([run1], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'run.jl'; // Naming the download file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  }


  useEffect(() => {
    setLines(computeLines(code));
  }, [code]);

  useEffect(() => {
    setMaterialjl1(materialjl)
    setGeo1(geometry)
    setRun1(runjl)
  }, []);

 

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode); 

    // Regex to capture 'mat_paramX::value'
    const regex = /mat_param(\d+)::(\d+)/g;
    let match;
    console.log("match", match)
    while ((match = regex.exec(newCode)) !== null) {
      const varName = `typeVar${match[1]}_mat`;
      const value = match[2];
      console.log(`${varName} is changed to ${value}`);
      updateVariable(varName, value);
    }
  };


  const geometry = `
  function devicegeometry(R::Vector{Float64})
x = R[1]; y = R[2]; z = R[3];
if (x<10*nm || x>50*nm)
return "ins"
else
return "metal"
end
end

geometry_params = Dict("A" => 2.866*nm*I(3), # this is the matrix of unit cell lattice vectors
   "nx" => 50, "ny" => 5, "nz" => 1, # number of times to tile this cell over space in each direction to make whole device
   "prune" => ["x","y","z"], # by default, system will set up periodic boundary conditions. This clips those hoppings
   )

    `;

const runjl = `
# this is the top level definition of the run parameters


γ⁵ = 0 # ?? not sure. this can go in constants? # TODO Vivian
runparams = Dict(
  "path" => OUTPUT_DIR,
  "material_hamiltonian" => material_hamiltonians,
  "material_params" => Dict("t" => 1.0, "ε₀" => 1.0, "site_positions"=>site_positions),

  # define the routines to run. The three main ones are unitcell, transport, and supercell. 
  # Comment out a routine to not run it.

  # so, for runs looking at the electronic properties of just one unit cell
  "unitcell" => Dict("material"=> "metal", "bands" => true, "bands_project" => [σ[1],γ⁵], "save"=>[:bandstructure, :DOS], "poisson" => false, "DOS" => false),
  
  # and for runs looking at the voltage-dependent transport properties
  "transport" => Dict("geometry" => devicegeometry, "ΔV" => 0.01, "μ" => 0.1*eV, "T" => 300, "η" => 1E-4*eV, "save" => [:transmission, :conductance], "electrodeMagnetization" => false, "Gʳinv_method" => :RGF, "D_spin" => 0.01*eV, "D_momentum" => 0.5*eV, "kspace"=>false, "E_samples" => [E for E = 0.0:0.1:2.0], "electrodeMaterial" => "metal"),
  
  # and for runs where we want to slap a bunch of unit cells together and get the scattering-corrected electronic properties
  "supercell" => Dict("geometry" => devicegeometry, "bands_project" => [σ[1],σ[2]], "poisson"=>true, "μ" => 0.1*eV, "T" => 300, "η" => 1E-4*eV, "save" => [:unfoldedbands], "density_project" => [I(2),[σ[1],σ[2],σ[3]]], "Gʳinv_method" => :RGF, "D_dephasing" => 0.1*eV, "D_spin" => 0.01*eV, "D_momentum" => 0.5*eV)
)

# all parameters of the simulation must be passed in through the runparams, and now we will ensure they are added
# or calculated in the beginning. 
function add_more_params!(runparams)
  # size of the H(k) hamiltonian for one unit cell
  n_unitcell = subspace_sizes["nsite"]*subspace_sizes["norb"]*subspace_sizes["nspin"]
  # size of the H(k) hamiltonian for the entire device
  n_device = geometry_params["nx"]*geometry_params["ny"]*geometry_params["nz"]*subspace_sizes["nsite"]*subspace_sizes["norb"]*subspace_sizes["nspin"]


  # this is a loop that will add keys to all routines
  for key in ["unitcell", "supercell", "transport"]
    if !haskey(runparams,key)
      continue
    end
    runparams[key]["material_hamiltonian"] = runparams["material_hamiltonian"]
    merge!(runparams[key], subspace_sizes)
    runparams[key]["path"] = runparams["path"]
  end
  
  if haskey(runparams,"unitcell")
    runparams["unitcell"]["n"] = n_unitcell
    merge!(runparams["unitcell"], runparams["material_params"])
  end

  if haskey(runparams,"supercell")
    runparams["supercell"]["n"] = n_device
    merge!(runparams["supercell"],geometry_params)
    merge!(runparams["supercell"], runparams["material_params"])
  end

  if haskey(runparams,"transport")
    runparams["transport"]["n"] = n_device
    
    # now we will add in the H(k) subspace, and then overwrite the nx, ny, nz with the device geometry
    merge!(runparams["transport"],geometry_params)
    push!(runparams["transport"]["prune"],"x")
    merge!(runparams["transport"], runparams["material_params"])
    runparams["transport"]["G"] = 2*π*inv(runparams["transport"]["A"])
  end
end

add_more_params!(runparams)


# All of these have references in this code and are used.
# copied this from random, but the code needs these in order to complete run. these need to be moved to a place
# TODO Vivian
anotherparamdict = Dict(
    "a₁" => [1.0e-9, 0.0, 0.0],
    "a₂" => [0.0, 1.0e-9, 0.0],
    "a₃" => [0.0, 0.0, 1.0e-9],
  "deviceMaterial" => "metal",
  "deviceMagnetization" => true,
  "ε₁" => 2,
  "fieldtype" => "β",
  "A" => [1 0 0; 0 1 0; 0 0 1],
    "returnvals" => ["transmission"],
    "μ_disorder" => 0.0,
    "SLa₂" => [0.0, 1.0e-9, 0.0],
    "δV" => 0.01,
    "l_scattering" => 0.0,
    "vf" => 1000000,
    "n_BLAS" => 8,
    "γ" => 0,
)
merge!(runparams["transport"], anotherparamdict)    
  `;
  const materialjl = `
    function nextsite(iorb::Int)
    return (1 - 2 * iorb)
end

function pushHopping!(NNs::Vector, t, ia::Vector{Int}, ib::Vector{Int}, p::Dict)
    a = xyztoi(p, ia)
    b = xyztoi(p, ib)
    ra = xyztor(p, ia)
    rb = xyztor(p, ib)
    r = rb - ra
    # for hopping term
    NN = deepcopy(Hopping(a, b, ia, ib, ra, rb, r, t, false, [0; 0; 0], ""))
    push!(NNs, NN)
end

function metalHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    t = (3 * p[${typeVar1_mat}] - 1 * eV) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            ib = Int.(ia + di)
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            t = -1 * p["t"] * I(2)
            pushHopping!(NNs, t, ia, ib, p)
            #t = (p.ϵ₁ + 2*p.t)*(I(2))
            #pushHopping!(NNs, t, ia, ia, p)
        end
    end
end

function insHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    t = (p[${typeVar2_mat}] + 3 * p[${typeVar1_mat}]) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            ib = Int.(ia + di)
            t = -1 / 2 * p["t"] * I(2)
            pushHopping!(NNs, t, ia, ib, p)
            #t = (p.ϵ₁ + 2*p.t)*(I(2))
            #pushHopping!(NNs, t, ia, ia, p)
        end
    end
end



function weyl3Hopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    # nearest neighbors
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            #di[5] = nextsite(iorb); 
            ib = Int.(ia + di)
            t = zeros(ComplexF64, 2, 2)
            if (ax == 3)
                t = p["t"] * σ[3]
            elseif (ax == 1)
                t == p["t"] * (-σ[3] .+ dir * 2 * im * σ[1])
            elseif (ax == 2)
                t == p["t"] * (-σ[3] .+ dir * 2 * im * σ[2])
            else
                println("Something broken! No 4th axis")
            end
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    # next nearest neighbors
    for dx = [-1, 1]
        for dy = [-1, 1]
            di = zeros(5)
            di[1] = dx
            di[2] = dy
            ib = Int.(ia + di)
            t = 1.5 * im * p["t"] * (-dx * σ[1] .+ -dy * σ[2]) # implements the next-nearest neigbor term
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    # next-to-next nearest neighbors
    for ax = 1:2
        for dir = [-1, 1]
            di = zeros(5)
            di[ax] = 2 * dir
            ib = Int.(ia + di)
            t = dir * p["t"] * 0.5 * im * σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end


function weyl2Hopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    # nearest neighbors
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            #di[5] = nextsite(iorb); 
            ib = Int.(ia + di)
            t = zeros(ComplexF64, 2, 2)
            if (ax == 1)
                t = p["t"] * (σ[1] .- σ[3])
            elseif (ax == 2)
                t = -p["t"] * (σ[1] .+ σ[3])
            elseif (ax == 3)
                t = p["t"] * σ[3]
            else
                println("Something broken! No 4th axis")
            end
            #t = (-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
    for dx = [-1, 1]
        for dy = [-1, 1]
            di = zeros(5)
            di[1] = dx
            di[2] = dy
            ib = Int.(ia + di)
            t = -dx * dy * 0.5 * p["t"] * σ[2] # implements the next-nearest neigbor term
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end

function chern2DHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    #ib[5] += nextsite(iorb)
    #t = 3*p.t*(I(2))
    #pushHopping!(NNs, t, ia, ib , p)
    # for H₂ = τ₃⊗σ₀
    t = nextsite(iorb) * (2 * p["m2"] + p["γ"]) * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            # for Hweyl = τ₁⊗k⋅σ
            di[5] = nextsite(iorb)
            ib = Int.(ia + di)
            t = (im / 2) * dir * p["t"] * σ[ax]
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            #t = nextsite(iorb)*(-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
            # for normal hopping term in hamiltonian
            ib[5] = iorb

            t = -(1 / 2) * nextsite(iorb) * p["m2"] * (I(2))
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end


function weylHopping(p::Dict, NNs::Vector{Hopping}, ia::Vector{Int})
    iorb = ia[5]
    ib = ia
    #ib[5] += nextsite(iorb)
    #t = 3*p.t*(I(2))
    #pushHopping!(NNs, t, ia, ib , p)
    # for H₂ = τ₃⊗σ₀
    t = 3 * nextsite(iorb) * p[${typeVar3_mat}] * (I(2))
    pushHopping!(NNs, t, ia, ia, p)
    for ax = 1:3
        for dir = [-1, 1]
            # for weyl term in hamiltonian
            di = zeros(5)
            di[ax] = dir
            # for Hweyl = τ₁⊗k⋅σ
            di[5] = nextsite(iorb)
            ib = Int.(ia + di)
            t = (-im / 2) * dir * p["t"] * σ[ax]
            #Ra = xyztor(p,ia); Rb = xyztor(p,ib); 
            #δ = Rb - Ra
            # implement H = +vf*𝐩⋅𝛔 = -vf𝑖ħ ∇ᵣ⋅σ on finite grid
            #t = nextsite(iorb)*(-im/2)*dir*p.t*σ[ax]
            pushHopping!(NNs, t, ia, ib, p)
            # for normal hopping term in hamiltonian
            ib[5] = iorb

            t = -(1 / 2) * nextsite(iorb) * p["t"] * (I(2))
            pushHopping!(NNs, t, ia, ib, p)
        end
    end
end



subspace_sizes = Dict{String,Number}(
    "nx" => 1,
    "ny" => 1,
    "nz" => 1,
    "norb" => 2,
    "nsite" => 1,
    "nspin" => 2
)

site_positions = [[0.0; 0.0; 0.0]] # positions of each site in the unit cell such that position of atom i = Rᵢ = A*site_position[i]

material_hamiltonians = Dict{String,Function}(
    "mtjweyl" => weylHopping,
    "2Dchern" => chern2DHopping,
    "weyl" => weylHopping,
    "weyl2" => weyl2Hopping,
    "weyl3" => weyl3Hopping,
    "wins" => insHopping,
    "ins" => insHopping,
    "insulator" => insHopping,
    "metal" => metalHopping
)



      `;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '20px' }}>
    
      
      <textarea
        value={materialjl1}
        onChange={handleCodeChange1}
        style={{
          width: '100%',
          height: `${lines * 21}px`,
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          resize: 'none'
        }}
      />

<Button heading={"Start Export Material"} onClick={exportToJuliaFileMat} />
<textarea
        value={geo1}
        onChange={handleCodeChange2}
        style={{
          width: '100%',
          height: `${lines * 21}px`,
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          resize: 'none'
        }}
      />

<Button heading={"Start Export Geometry"} onClick={exportToJuliaFileMat} />
<textarea
        value={run1}
        onChange={handleCodeChange3}
        style={{
          width: '100%',
          height: `${lines * 21}px`,
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          resize: 'none'
        }}
      />

<Button heading={"Start Export Run"} onClick={exportToJuliaFileRun} />

    </div>
  );
}

export default CodeEditor;